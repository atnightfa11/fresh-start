from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
import random
import json
import redis
import os
from redis import Redis
from typing import List, Optional
from fastapi.responses import JSONResponse

# Pydantic Models
class TrendBase(BaseModel):
    title: str
    description: str
    base_score: float
    variance: float
    category: str

class TrendResponse(TrendBase):
    impact_score: float
    first_seen: datetime
    last_updated: datetime

class SearchTrendResponse(BaseModel):
    term: str
    growth: float
    date: str
    industry: str
    region: List[str]

class MetricResponse(BaseModel):
    name: str 
    value: float
    change: float
    trend_data: List[float]

class MarketIntelligenceResponse(BaseModel):
    trends: List[TrendResponse]
    search_trends: List[SearchTrendResponse]
    metrics: List[MetricResponse]
    generated_at: datetime

# Initialize App
app = FastAPI(title="Neural Signal API",
             description="Real-time AI Marketing Intelligence Engine",
             version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ai-marketing.heathergrass.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redis Configuration
REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')
redis_client = redis.Redis.from_url(REDIS_URL, decode_responses=True)
CACHE_TTL = int(os.getenv('CACHE_TTL', 300))  # 5 minutes

# Sample Data Generators
TREND_CATEGORIES = [
    "AI Automation", "Customer Experience", "Content Generation",
    "Predictive Analytics", "Ad Optimization"
]

def generate_trend() -> TrendResponse:
    return TrendResponse(
        title=f"AI in {random.choice(['Retail', 'Healthcare', 'Finance'])}",
        description="Advanced AI integration driving market changes",
        base_score=random.uniform(3.5, 4.8),
        variance=random.uniform(0.1, 0.5),
        category=random.choice(TREND_CATEGORIES),
        impact_score=random.uniform(3.0, 5.0),
        first_seen=datetime.now() - timedelta(days=random.randint(1, 30)),
        last_updated=datetime.now()
    )

def generate_search_trend() -> SearchTrendResponse:
    return SearchTrendResponse(
        term=f"AI {random.choice(['Marketing', 'Analytics', 'Automation'])}",
        growth=random.uniform(10.0, 45.0),
        date=(datetime.now() - timedelta(days=random.randint(0,6))).strftime("%Y-%m-%d"),
        industry=random.choice(["E-commerce", "SaaS", "Healthcare"]),
        region=[random.choice(["Global", "NA", "EU", "APAC"])]
    )

def generate_metrics() -> MetricResponse:
    return MetricResponse(
        name=random.choice(["Engagement Rate", "Conversion Lift", "ROI Improvement"]),
        value=random.uniform(15.0, 85.0),
        change=random.uniform(-5.0, 25.0),
        trend_data=[random.uniform(10, 100) for _ in range(7)]
    )

# Core Endpoint
@app.get("/api/market-intelligence", response_model=MarketIntelligenceResponse)
async def get_market_intelligence():
    try:
        # Try cache first
        if redis_client.exists("market_intelligence"):
            cached = redis_client.get("market_intelligence")
            return JSONResponse(content=json.loads(cached))
        
        # Generate fresh data
        data = MarketIntelligenceResponse(
            trends=[generate_trend() for _ in range(5)],
            search_trends=[generate_search_trend() for _ in range(7)],
            metrics=[generate_metrics() for _ in range(3)],
            generated_at=datetime.now()
        )
        
        # Cache with compression
        redis_client.setex(
            "market_intelligence",
            CACHE_TTL,
            json.dumps(data.dict(), default=str)
        )
        
        return data
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating intelligence: {str(e)}"
        )

# Health Check
@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "version": "1.0.0",
        "redis": "connected" if redis_client.ping() else "disconnected"
    } 