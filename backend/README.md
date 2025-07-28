# AI Marketing Hub Backend

FastAPI backend service for AI Marketing Hub.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run development server:
```bash
uvicorn main:app --reload --port 8000
```

## API Endpoints

- `GET /api/market-intelligence`: Get marketing trends and metrics
  - Returns trending topics and search trends data
  - Includes caching with Redis (when enabled)
- `GET /health`: Health check endpoint

## Deployment

Deployed on Render with automatic deployments from main branch.

### Environment Variables

These are set in Render's dashboard Environment Settings:
- `REDIS_ENABLED`: Set to 'true' to enable Redis caching
- `REDIS_HOST`: Automatically provided by Render
- `REDIS_PORT`: Automatically provided by Render
- `REDIS_PASSWORD`: Automatically provided by Render
- `REDIS_SSL`: Set to 'true' for SSL connection

For Sonar API:
- `SONAR_API_KEY`: Your SonarQube API token
- `SONAR_HOST`: sonar.yourdomain.com
- `SONAR_PORT`: 9000

For Perplexity Sonar Pro:
- `PERPLEXITY_API_KEY`: Your Perplexity API key (get from https://www.perplexity.ai/settings/api)
- `CACHE_TTL`: Cache duration in seconds (default: 1800 = 30 minutes)

Never commit these to version control!

## Quick Setup for Perplexity Sonar Pro

1. Get your API key from https://www.perplexity.ai/settings/api
2. Set `PERPLEXITY_API_KEY` in your environment
3. The backend will automatically use Sonar Pro for real market intelligence
4. If no API key is provided, it falls back to sample data

Note: Do not add these to .env files - they are managed through Render's dashboard. 