# AI Marketing Hub

Real-time AI Marketing Intelligence Dashboard powered by **Perplexity Sonar Pro** for live market insights.

## 🚀 Features

- **Real-time Market Intelligence** via Perplexity Sonar Pro API
- **Live Trending Topics** with citations and sources
- **Marketing Metrics** with industry benchmarks
- **Search Trends Analysis** across marketing technologies
- **Interactive Dashboard** with modern UI components
- **Smart Caching** with Redis for performance

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI, Python 3.9+
- **AI Intelligence**: Perplexity Sonar Pro API
- **Caching**: Redis
- **Deployment**: Netlify (Frontend), Render (Backend)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.9+
- Perplexity API key ([Get one here](https://www.perplexity.ai/settings/api))
- Redis (optional, for caching)

### Frontend Setup

```bash
# Install dependencies
npm install

# Set environment variables
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# Start development server
npm run dev
```

### Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export PERPLEXITY_API_KEY=your_api_key_here
export REDIS_URL=redis://localhost:6379  # optional

# Start backend server
uvicorn main:app --reload --port 8000
```

## 🔑 Environment Variables

### Backend (.env or environment)
```bash
PERPLEXITY_API_KEY=your_perplexity_api_key
REDIS_URL=redis://localhost:6379
CACHE_TTL=1800
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## 📊 API Integration

The app uses **Perplexity Sonar Pro** for real-time market intelligence:

- **Real-time web search** with citations
- **Marketing trend analysis** across industries  
- **Search behavior insights** with geographic data
- **Industry benchmarks** and performance metrics

If no API key is provided, the backend gracefully falls back to sample data.

## 🚀 Deployment

### Frontend (Netlify)
- Connect your GitHub repo to Netlify
- Set `NEXT_PUBLIC_BACKEND_URL` to your backend URL
- Deploy automatically on git push

### Backend (Render)
- Connect your GitHub repo to Render
- Set environment variables in Render dashboard
- Deploys automatically from main branch

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
├── components/             # React components
├── lib/                   # Utilities and API clients
├── types/                 # TypeScript type definitions
├── backend/               # FastAPI backend
│   ├── main.py           # Sonar Pro integration
│   └── requirements.txt   # Python dependencies
└── README.md
```

## 🔄 Data Flow

1. Frontend requests market intelligence
2. Backend queries Perplexity Sonar Pro API
3. Real-time market data parsed and structured
4. Cached results served with Redis
5. Interactive dashboard updates

## 🛡️ Error Handling

- Graceful fallback to sample data if API unavailable
- Comprehensive error boundaries in React
- Retry logic with exponential backoff
- User-friendly error messages

## 📈 Performance

- Redis caching (30min TTL)
- Efficient data parsing
- Lazy loading components
- Optimized API calls

Built with ❤️ using modern web technologies and AI-powered insights.
