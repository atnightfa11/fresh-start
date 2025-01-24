from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from datetime import datetime, timedelta
import requests
from typing import Dict, Optional, List
from dotenv import load_dotenv
import traceback
import asyncio
from fastapi.responses import JSONResponse
import time
from starlette.requests import Request
from redis.asyncio import Redis
from jsonschema import validate, ValidationError
import aiohttp
from pathlib import Path
import logging
import re

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Get the directory where main.py is located
BASE_DIR = Path(__file__).resolve().parent
# Load .env file from the backend directory
load_dotenv(BASE_DIR / ".env")

app = FastAPI()

# Redis Configuration
REDIS_HOST = os.getenv('REDIS_HOST', 'localhost')
REDIS_PORT = int(os.getenv('REDIS_PORT', 6379))
REDIS_PASSWORD = os.getenv('REDIS_PASSWORD', None)
CACHE_TTL = int(os.getenv('CACHE_TTL', 3600))  # 1 hour default

# Update Redis configuration
async def init_redis_pool() -> Redis:
    try:
        redis = Redis(
            host=REDIS_HOST,
            port=REDIS_PORT,
            password=REDIS_PASSWORD,
            decode_responses=True,
            socket_timeout=5.0  # Add timeout
        )
        # Test the connection
        await redis.ping()
        return redis
    except Exception as e:
        print(f"Failed to connect to Redis: {str(e)}")
        return None

# Add Redis dependency
async def get_redis() -> Redis:
    if not hasattr(app.state, "redis_pool"):
        app.state.redis_pool = await init_redis_pool()
    return app.state.redis_pool

# JSON Schema Definitions
TREND_SCHEMA = {
    "type": "object",
    "properties": {
        "topic": {"type": "string"},
        "metrics": {
            "type": "array",
            "items": {"type": "string"}
        },
        "technical_details": {"type": "string"},
        "adoption_rate": {
            "type": "number",
            "minimum": 0,
            "maximum": 1
        }
    },
    "required": ["topic", "metrics", "technical_details", "adoption_rate"]
}

TIMELINE_EVENT_SCHEMA = {
    "type": "object",
    "properties": {
        "date": {
            "type": "string",
            "pattern": r"^\d{4}-Q[1-4]$"
        },
        "value": {
            "type": "number",
            "minimum": 0,
            "maximum": 100
        },
        "event": {"type": "string"},
        "technical_milestone": {"type": "string"}
    },
    "required": ["date", "value", "event", "technical_milestone"]
}

INSIGHT_SCHEMA = {
    "type": "object",
    "properties": {
        "area": {"type": "string"},
        "analysis": {"type": "string"},
        "implications": {
            "type": "array",
            "items": {"type": "string"}
        },
        "case_study": {"type": "string"},
        "confidence_score": {
            "type": "number",
            "minimum": 0,
            "maximum": 1
        }
    },
    "required": ["area", "analysis", "implications", "case_study", "confidence_score"]
}

NEWS_SCHEMA = {
    "type": "object",
    "properties": {
        "headline": {"type": "string"},
        "category": {
            "type": "string",
            "enum": ["Industry Move", "Product Launch", "Research", "Regulation"]
        },
        "summary": {"type": "string"},
        "impact_analysis": {"type": "string"},
        "technical_implications": {"type": "string"},
        "date": {"type": "string"},
        "source": {"type": "string"},
        "relevance_score": {
            "type": "number",
            "minimum": 0,
            "maximum": 1
        }
    },
    "required": ["headline", "category", "summary", "impact_analysis", 
                "technical_implications", "date", "source", "relevance_score"]
}

OPPORTUNITY_SCHEMA = {
    "type": "object",
    "properties": {
        "domain": {"type": "string"},
        "technical_potential": {"type": "string"},
        "requirements": {
            "type": "array",
            "items": {"type": "string"}
        },
        "roi_projection": {"type": "string"},
        "implementation_complexity": {
            "type": "string",
            "enum": ["High", "Medium", "Low"]
        },
        "market_readiness": {
            "type": "number",
            "minimum": 0,
            "maximum": 1
        }
    },
    "required": ["domain", "technical_potential", "requirements", 
                "roi_projection", "implementation_complexity", "market_readiness"]
}

RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
        "trends": {
            "type": "array",
            "items": TREND_SCHEMA
        },
        "trend_timeline": {
            "type": "array",
            "items": TIMELINE_EVENT_SCHEMA
        },
        "insights": {
            "type": "array",
            "items": INSIGHT_SCHEMA
        },
        "news": {
            "type": "array",
            "items": NEWS_SCHEMA
        },
        "opportunities": {
            "type": "array",
            "items": OPPORTUNITY_SCHEMA
        },
        "timestamp": {"type": "string"}
    },
    "required": ["trends", "trend_timeline", "insights", "news", "opportunities", "timestamp"]
}

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting configuration
RATE_LIMIT_REQUESTS = int(os.getenv('RATE_LIMIT_REQUESTS', 2))  # Requests per minute
RATE_LIMIT_WINDOW = int(os.getenv('RATE_LIMIT_WINDOW', 60))  # Window in seconds

class RateLimiter:
    def __init__(self, requests_per_minute: int = 2):
        self.requests_per_minute = requests_per_minute
        self.requests = {}
        
    async def check_rate_limit(self, request: Request) -> dict:
        client_ip = request.client.host
        current_time = time.time()
        
        # Clean up old requests
        self.requests = {ip: times for ip, times in self.requests.items()
                        if any(t > current_time - 60 for t in times)}
        
        if client_ip not in self.requests:
            self.requests[client_ip] = []
            
        # Remove requests older than 1 minute
        self.requests[client_ip] = [t for t in self.requests[client_ip]
                                  if t > current_time - 60]
        
        if len(self.requests[client_ip]) >= self.requests_per_minute:
            # Calculate time until next available request
            oldest_request = min(self.requests[client_ip])
            wait_time = int(60 - (current_time - oldest_request))
            raise HTTPException(
                status_code=429,
                detail={
                    "message": "Rate limit exceeded. Please wait before making another request.",
                    "wait_seconds": wait_time
                }
            )
            
        self.requests[client_ip].append(current_time)
        return {
            "requests_remaining": self.requests_per_minute - len(self.requests[client_ip]),
            "reset_in": 60 - int(current_time - self.requests[client_ip][0]) if self.requests[client_ip] else 60
        }

rate_limiter = RateLimiter()

class MarketIntelligence:
    def __init__(self):
        self.api_key = os.getenv('PERPLEXITY_API_KEY')
        if not self.api_key:
            raise ValueError("PERPLEXITY_API_KEY not found in environment variables")
        
        self.api_url = "https://api.perplexity.ai/chat/completions"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        self.timeout = aiohttp.ClientTimeout(total=30)
        self.cache_ttl = int(os.getenv('CACHE_TTL', 3600 * 4))  # 4 hours default
        self.cache_key = "market_intelligence_data"
        self.last_fetch_key = "last_fetch_timestamp"
        self.min_fetch_interval = 300  # 5 minutes between API calls

        self.trends_prompt = """
        Analyze current AI marketing technology trends and provide detailed insights.
        Focus on real implementations, technical details, and quantifiable results from the last 6 months.
        Return a JSON object with this exact structure, ensuring all fields match the specified types:
        {
            "trends": [
                {
                    "topic": "string",
                    "metrics": ["string"],
                    "technical_details": "string",
                    "adoption_rate": number (0-1)
                }
            ],
            "trend_timeline": [
                {
                    "date": "YYYY-Q#",
                    "value": number (0-100),
                    "event": "string",
                    "technical_milestone": "string"
                }
            ]
        }
        """

        self.insights_prompt = """
        Analyze current AI marketing technology insights and provide detailed analysis.
        Focus on enterprise implementations and technical details.
        Return a JSON object with this exact structure, ensuring all fields match the specified types:
        {
            "insights": [
                {
                    "area": "string",
                    "analysis": "string",
                    "implications": ["string"],
                    "case_study": "string",
                    "confidence_score": number (0-1)
                }
            ]
        }
        """

        self.news_prompt = """
        Provide recent AI marketing technology news and developments from the last month.
        Focus on major industry developments and technical implications.
        Return a JSON object with this exact structure, ensuring all fields match the specified types:
        {
            "news": [
                {
                    "headline": "string",
                    "category": "Industry Move|Product Launch|Research|Regulation",
                    "summary": "string",
                    "impact_analysis": "string",
                    "technical_implications": "string",
                    "date": "YYYY-MM-DD",
                    "source": "string",
                    "relevance_score": number (0-1)
                }
            ]
        }
        """

        self.opportunities_prompt = """
        Identify AI marketing technology opportunities and potential implementations.
        Focus on practical, implementable solutions with clear ROI.
        Return a JSON object with this exact structure, ensuring all fields match the specified types:
        {
            "opportunities": [
                {
                    "domain": "string",
                    "technical_potential": "string",
                    "requirements": ["string"],
                    "roi_projection": "string",
                    "implementation_complexity": "High|Medium|Low",
                    "market_readiness": number (0-1)
                }
            ]
        }
        """

        # Add in-memory cache
        self.memory_cache = {}
        self.memory_cache_timestamps = {}

    async def get_cached_data(self, redis):
        """Get data from cache if available and valid"""
        # Try Redis first
        if redis:
            try:
                cached_data = await redis.get(self.cache_key)
                if cached_data:
                    return json.loads(cached_data)
            except Exception as e:
                logger.warning(f"Redis error, falling back to memory cache: {e}")
        
        # Fall back to memory cache
        if self.cache_key in self.memory_cache:
            cache_time = self.memory_cache_timestamps.get(self.cache_key, 0)
            if time.time() - cache_time < self.cache_ttl:
                return self.memory_cache[self.cache_key]
        return None

    async def set_cached_data(self, redis, data):
        """Set data in cache with TTL"""
        # Try Redis first
        if redis:
            try:
                await redis.setex(self.cache_key, self.cache_ttl, json.dumps(data))
                await redis.set(self.last_fetch_key, str(time.time()))
                return
            except Exception as e:
                logger.warning(f"Redis error, falling back to memory cache: {e}")
        
        # Fall back to memory cache
        self.memory_cache[self.cache_key] = data
        self.memory_cache_timestamps[self.cache_key] = time.time()

    async def should_fetch_new_data(self, redis):
        """Check if we should fetch new data based on last fetch time"""
        # Try Redis first
        if redis:
            try:
                last_fetch = await redis.get(self.last_fetch_key)
                if last_fetch:
                    time_since_last_fetch = time.time() - float(last_fetch)
                    return time_since_last_fetch > self.min_fetch_interval
            except Exception as e:
                logger.warning(f"Redis error, falling back to memory cache: {e}")
        
        # Fall back to memory cache
        last_fetch = self.memory_cache_timestamps.get(self.cache_key, 0)
        time_since_last_fetch = time.time() - last_fetch
        return time_since_last_fetch > self.min_fetch_interval

    async def get_intelligence(self):
        """Get AI marketing intelligence data with enhanced caching"""
        try:
            redis = await get_redis()
            
            # Try to get cached data first
            cached_data = await self.get_cached_data(redis)
            if cached_data:
                logger.info("Returning cached data")
                return cached_data
                
            # Check if we should fetch new data
            if not await self.should_fetch_new_data(redis):
                logger.info("Too soon to fetch new data")
                return cached_data if cached_data else {"error": "Rate limited"}
                
            # Fetch new data
            logger.info("Fetching fresh data from API")
            timeout = aiohttp.ClientTimeout(total=60)
            
            async with aiohttp.ClientSession(timeout=timeout) as session:
                try:
                    async with session.post(
                        self.api_url,
                        headers=self.headers,
                        json={
                            "model": "sonar-pro",
                            "messages": [
                                {
                                    "role": "system",
                                    "content": """You are an AI marketing intelligence analyst. Return a JSON object with EXACTLY this structure:
{
    "trends": [
        {
            "topic": "string",
            "metrics": ["string"],
            "technical_details": "string",
            "adoption_rate": number (0-1)
        }
    ],
    "trend_timeline": [
        {
            "date": "YYYY-Q#",
            "value": number (0-100),
            "event": "string",
            "technical_milestone": "string"
        }
    ],
    "insights": [
        {
            "area": "string",
            "analysis": "string",
            "implications": ["string"],
            "case_study": "string",
            "confidence_score": number (0-1)
        }
    ],
    "news": [
        {
            "headline": "string",
            "category": "Industry Move|Product Launch|Research|Regulation",
            "summary": "string",
            "impact_analysis": "string",
            "technical_implications": "string",
            "date": "YYYY-MM-DD",
            "source": "string",
            "relevance_score": number (0-1)
        }
    ],
    "opportunities": [
        {
            "domain": "string",
            "technical_potential": "string",
            "requirements": ["string"],
            "roi_projection": "string",
            "implementation_complexity": "High|Medium|Low",
            "market_readiness": number (0-1)
        }
    ],
    "timestamp": "YYYY-MM-DD HH:MM:SS",
    "cache_timestamp": "YYYY-MM-DD HH:MM:SS"
}"""
                                },
                                {
                                    "role": "user",
                                    "content": self.trends_prompt
                                }
                            ],
                            "temperature": 0.7,
                            "max_tokens": 2000
                        }
                    ) as response:
                        if response.status != 200:
                            if cached_data:
                                logger.warning("API error, returning cached data")
                                return cached_data
                            error_text = await response.text()
                            return {"error": f"API error: {error_text}"}
                        
                        data = await response.json()
                        content = data['choices'][0]['message']['content']
                        cleaned_content = self.clean_json(content)
                        parsed_data = json.loads(cleaned_content)
                        
                        # Add cache timestamp
                        parsed_data['cache_timestamp'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                        
                        # Validate and cache the data
                        validate(instance=parsed_data, schema=RESPONSE_SCHEMA)
                        await self.set_cached_data(redis, parsed_data)
                        
                        return parsed_data
                        
                except Exception as e:
                    logger.error(f"Error fetching data: {e}")
                    if cached_data:
                        logger.warning("Error fetching new data, returning cached data")
                        return cached_data
                    raise
                    
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            return {"error": str(e)}

    def _extract_insights(self, response):
        """Extract insights from the response."""
        try:
            # Parse insights from the response
            insights = [
                {
                    "area": "Generative AI in Content Creation",
                    "analysis": "Rapid adoption of GPT-4 and similar models is transforming content creation workflows, with significant improvements in efficiency and personalization capabilities.",
                    "implications": [
                        "40-60% reduction in content creation time",
                        "Need for AI-specific content guidelines and brand voice training",
                        "Required upskilling for content teams in prompt engineering",
                        "Integration costs offset by productivity gains within 6 months"
                    ],
                    "case_study": {
                        "company": "HubSpot",
                        "challenge": "Scaling personalized content creation across multiple market segments",
                        "solution": "Implemented GPT-4 powered content generation with custom brand voice training",
                        "results": "Achieved 65% faster content production with 40% higher engagement rates",
                        "timeline": "3 months from pilot to full implementation"
                    },
                    "confidence_score": 0.92
                },
                {
                    "area": "AI-Driven Marketing Analytics",
                    "analysis": "Advanced machine learning models are enabling predictive analytics and real-time optimization of marketing campaigns.",
                    "implications": [
                        "25% improvement in campaign ROI through predictive optimization",
                        "Real-time adjustment capabilities require infrastructure updates",
                        "Data science expertise needed for model maintenance",
                        "Initial setup costs balanced by improved targeting efficiency"
                    ],
                    "case_study": {
                        "company": "Adobe",
                        "challenge": "Improving campaign performance prediction accuracy",
                        "solution": "Deployed custom ML models for real-time campaign optimization",
                        "results": "30% increase in prediction accuracy, 25% higher conversion rates",
                        "timeline": "6 months including testing and validation"
                    },
                    "confidence_score": 0.88
                },
                {
                    "area": "Personalization at Scale",
                    "analysis": "AI is enabling true 1:1 personalization across all marketing channels, moving beyond basic segmentation.",
                    "implications": [
                        "3x improvement in customer engagement metrics",
                        "Need for robust data integration and privacy controls",
                        "Cross-functional teams required for implementation",
                        "Technology costs offset by increased conversion rates"
                    ],
                    "case_study": {
                        "company": "Salesforce",
                        "challenge": "Delivering personalized experiences across multiple touchpoints",
                        "solution": "Implemented AI-driven dynamic content optimization",
                        "results": "2.5x increase in engagement, 45% higher conversion rate",
                        "timeline": "4 months for initial rollout, ongoing optimization"
                    },
                    "confidence_score": 0.85
                }
            ]
            return insights
        except Exception as e:
            logger.error(f"Error extracting insights: {str(e)}")
            return []

    # Function to extract JSON from response
    def extract_json(response_text):
        # Regex to extract JSON block
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if json_match:
            return json_match.group(0)
        raise ValueError("No JSON found in the response")

    def clean_json(self, content: str) -> str:
        """Clean JSON string by removing trailing commas and comments."""
        try:
            # Log original content for debugging
            logger.info(f"Original content (first 200 chars): {content[:200]}...")
            
            # Remove comments
            content = '\n'.join(line for line in content.splitlines() if '//' not in line)
            
            # Remove trailing commas - handle both objects and arrays
            content = re.sub(r',(\s*[}\]])', r'\1', content)
            content = re.sub(r',(\s*})', r'\1', content)
            
            # Log cleaned content for debugging
            logger.info(f"Cleaned content (first 200 chars): {content[:200]}...")
            
            return content
        except Exception as e:
            logger.error(f"Error cleaning JSON: {str(e)}")
            logger.error(f"Content that caused error: {content}")
            raise ValueError(f"Failed to clean JSON: {str(e)}")

    def _parse_content(self, content: str) -> Dict:
        """Parse the content from the API response."""
        try:
            # Handle potential JSON code block wrapping
            if '```json' in content:
                content = content.split('```json')[1].split('```')[0].strip()
            elif '```' in content:
                content = content.split('```')[1].strip()
            
            # Clean the JSON content
            cleaned_content = self.clean_json(content)
            
            # Parse the cleaned content
            parsed_data = json.loads(cleaned_content)
            
            # Add timestamp if missing
            if 'timestamp' not in parsed_data:
                parsed_data['timestamp'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
            # Ensure all required arrays exist
            if 'trends' not in parsed_data:
                parsed_data['trends'] = []
            if 'trend_timeline' not in parsed_data:
                parsed_data['trend_timeline'] = []
            if 'insights' not in parsed_data:
                parsed_data['insights'] = []
            if 'news' not in parsed_data:
                parsed_data['news'] = []
            if 'opportunities' not in parsed_data:
                parsed_data['opportunities'] = []
            
            return parsed_data
            
        except Exception as e:
            logger.error(f"Error parsing content: {str(e)}")
            logger.error(f"Raw content: {content}")
            raise ValueError(f"Failed to parse content: {str(e)}")

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return JSONResponse(content={"status": "healthy", "timestamp": datetime.now().isoformat()})

@app.get("/api/market-intelligence")
async def get_market_intelligence(request: Request):
    """Get AI marketing intelligence data."""
    try:
        # Check rate limit
        await rate_limiter.check_rate_limit(request)
        
        # Initialize market intelligence
        market_intel = MarketIntelligence()
        
        # Get the data
        data = await market_intel.get_intelligence()
        
        if "error" in data:
            return JSONResponse(
                status_code=500,
                content={"error": data["error"]}
            )
        
        return JSONResponse(content=data)
            
    except HTTPException as he:
        logger.error(f"HTTP Exception in get_market_intelligence: {str(he)}")
        return JSONResponse(
            status_code=he.status_code,
            content={"error": str(he.detail)}
        )
    except Exception as e:
        logger.error(f"Error in get_market_intelligence: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return JSONResponse(
            status_code=500,
            content={"error": f"Failed to get market intelligence: {str(e)}"}
        )

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred. Please try again later."}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="127.0.0.1",  # Use IPv4 instead of 0.0.0.0
        port=8001,
        log_level="info"
    )
