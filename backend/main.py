from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from datetime import datetime
import requests
from typing import Dict
from dotenv import load_dotenv
import traceback

# Load environment variables
load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

    async def query_perplexity(self, prompt: str) -> Dict:
        """Make a request to Perplexity API"""
        payload = {
            "model": "llama-3.1-sonar-small-128k-online",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a marketing intelligence analyst. Respond ONLY with the JSON object, no additional text or markdown."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.7
        }

        try:
            print(f"Making request to Perplexity API with headers: {self.headers}")
            response = requests.post(
                self.api_url,
                headers=self.headers,
                json=payload,
                timeout=30
            )
            response.raise_for_status()
            
            # Get the content from the response
            content = response.json()['choices'][0]['message']['content']
            
            # Extract JSON from the content
            try:
                # Try to find JSON between triple backticks if present
                if '```json' in content:
                    json_str = content.split('```json')[1].split('```')[0].strip()
                else:
                    json_str = content.strip()
                
                # Parse the JSON
                parsed_content = json.loads(json_str)
                print(f"Successfully parsed JSON: {parsed_content}")
                return parsed_content
                
            except json.JSONDecodeError as e:
                print(f"Failed to parse JSON content: {content}")
                raise HTTPException(
                    status_code=500, 
                    detail="Failed to parse response as JSON. Please try again."
                )
                
        except requests.exceptions.RequestException as e:
            print(f"API request failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"API request failed: {str(e)}")

    async def get_insights(self) -> Dict:
        """Collect market intelligence using Perplexity"""
        trends_prompt = """
        Analyze current AI marketing technology adoption and implementation trends. Focus on quantifiable metrics and technical details.
        Return detailed JSON in this format:
        {
            "trends": [
                {
                    "topic": string,
                    "metrics": [
                        "Specific quantifiable metric with context",
                        "Real implementation result with percentage"
                    ],
                    "technical_details": "Detailed technical implementation explanation",
                    "adoption_rate": number (0-1)
                }
            ],
            "trend_timeline": [
                {
                    "date": "2024-Q1",
                    "value": number (0-100),
                    "event": "Major industry development",
                    "technical_milestone": "Technical achievement detail"
                }
            ]
        }

        Include:
        1. Actual implementation metrics from major platforms
        2. Technical architecture details
        3. Integration challenges and solutions
        4. Performance benchmarks
        5. Resource requirements
        
        Focus on enterprise-grade implementations and verified case studies.
        """

        insights_prompt = """
        Provide strategic analysis of AI marketing technology developments and implications.
        Return detailed JSON in this format:
        {
            "insights": [
                {
                    "area": "Technical domain or capability",
                    "analysis": "Deep technical analysis of current state and developments",
                    "implications": [
                        "Technical impact on infrastructure",
                        "Integration requirements",
                        "Skill requirements and team structure",
                        "Cost and resource implications"
                    ],
                    "case_study": "Detailed technical implementation example with results",
                    "confidence_score": number (0-1)
                }
            ]
        }

        Include:
        1. Infrastructure requirements
        2. Technical stack analysis
        3. Integration patterns
        4. Scaling considerations
        5. Security implications
        
        Focus on enterprise architecture and technical decision-making criteria.
        """

        news_prompt = """
        Analyze and synthesize the most significant recent developments in AI marketing technology, focusing on:
        1. Major Product Launches: New AI features in marketing platforms
        2. Industry Shifts: Changes in market dynamics and company strategies
        3. Research Breakthroughs: New techniques becoming available for marketing
        4. Regulatory Updates: Privacy and AI governance affecting marketing

        Return detailed JSON in this format:
        {
            "news": [
                {
                    "headline": string,
                    "category": "Industry Move" | "Product Launch" | "Research" | "Regulation",
                    "summary": string,
                    "impact_analysis": string,
                    "technical_implications": string,
                    "date": string,
                    "source": string,
                    "relevance_score": number (0-1)
                }
            ]
        }

        For each development, provide:
        - Timeline context (when it happened/was announced)
        - Technical details of implementation
        - Market impact analysis
        - Practical implications for marketing teams

        Include only developments from the past quarter for relevance.
        """

        opportunities_prompt = """
        Analyze emerging opportunities in AI marketing technology implementation.
        Return detailed JSON in this format:
        {
            "opportunities": [
                {
                    "domain": "Technical area or capability",
                    "technical_potential": "Detailed technical explanation of the opportunity",
                    "requirements": [
                        "Specific technical requirement",
                        "Infrastructure need",
                        "Skill requirement"
                    ],
                    "roi_projection": "Quantified potential return with timeline",
                    "implementation_complexity": "High|Medium|Low",
                    "market_readiness": number (0-1)
                }
            ]
        }

        Include:
        1. Technical feasibility analysis
        2. Implementation requirements
        3. Resource needs assessment
        4. Risk analysis
        5. Timeline considerations
        
        Focus on actionable opportunities with clear technical requirements.
        """

        try:
            # Get analysis for each section
            trends_data = await self.query_perplexity(trends_prompt)
            insights_data = await self.query_perplexity(insights_prompt)
            news_data = await self.query_perplexity(news_prompt)
            opportunities_data = await self.query_perplexity(opportunities_prompt)
            
            # Combine responses
            response = {
                "trends": trends_data.get("trends", []),
                "trend_timeline": trends_data.get("trend_timeline", []),
                "insights": insights_data.get("insights", []),
                "news": news_data.get("news", []),
                "opportunities": opportunities_data.get("opportunities", [])
            }
            
            print(f"Got insights response: {response}")
            return response
        except Exception as e:
            print(f"Error getting insights: {str(e)}")
            print(f"Full traceback: {traceback.format_exc()}")
            raise

@app.get("/api/market-intelligence")
async def get_market_intelligence():
    """Main endpoint for market intelligence"""
    try:
        analyzer = MarketIntelligence()
        response = await analyzer.get_insights()
        
        result = {
            "intelligence": {
                "trends": response["trends"],
                "insights": response["insights"],
                "news": response["news"],
                "opportunities": response["opportunities"],
                "timestamp": datetime.now().isoformat()
            },
            "visualizations": {
                "trend_timeline": response["trend_timeline"]
            }
        }
        print(f"Returning result: {result}")
        return result
        
    except Exception as e:
        print(f"Error in get_market_intelligence: {str(e)}")
        print(f"Full traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
