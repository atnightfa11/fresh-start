# 🚀 Deployment Guide

Neural Signal is designed to be deployed with a **Next.js frontend** and **FastAPI backend** on separate platforms.

## 📋 Quick Deployment Overview

| Component | Recommended Platform | Alternative |
|-----------|---------------------|-------------|
| **Frontend** | Vercel or Netlify | Any static host |
| **Backend** | Render or Railway | Heroku, AWS, GCP |
| **Database** | Redis Cloud | Local Redis |

---

## 🎯 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Push to GitHub first
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables:
     - `NEXT_PUBLIC_BACKEND_URL`: Your backend URL (e.g., `https://your-app.onrender.com`)

3. **Auto-deployment**
   - Vercel will automatically deploy on every push to main

### Option 2: Netlify

1. **Build Configuration**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**
   - `NEXT_PUBLIC_BACKEND_URL`: Your backend URL
   - `NEXT_TELEMETRY_DISABLED`: `1`

---

## 🔧 Backend Deployment

### Option 1: Render (Recommended)

1. **Create Web Service**
   - Connect your GitHub repository
   - Root directory: `backend`
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

2. **Environment Variables**
   ```
   PERPLEXITY_API_KEY=your_actual_api_key
   REDIS_URL=redis://your-redis-url (optional)
   CACHE_TTL=1800
   ```

3. **Python Version**
   - Runtime: `python-3.11.5` (specified in `runtime.txt`)

### Option 2: Railway

1. **Deploy from GitHub**
   - Connect repository
   - Select `backend` folder as root
   - Railway auto-detects Python and uses `requirements.txt`

2. **Environment Variables**
   - Set same variables as Render above

---

## 📊 Database Setup (Optional but Recommended)

### Redis Cloud (Free Tier Available)

1. **Create Account**
   - Go to [redis.com](https://redis.com)
   - Create free database (30MB free)

2. **Get Connection URL**
   - Copy the Redis URL from your dashboard
   - Format: `redis://username:password@host:port`

3. **Configure Backend**
   - Set `REDIS_URL` environment variable in your backend deployment

---

## 🔑 Environment Variables Setup

### Frontend (.env.local)
```bash
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com
```

### Backend Environment Variables
```bash
PERPLEXITY_API_KEY=your_perplexity_sonar_pro_api_key
REDIS_URL=redis://your-redis-connection-string
CACHE_TTL=1800
```

---

## 🧪 Testing Your Deployment

### 1. Backend Health Check
```bash
curl https://your-backend-url.onrender.com/health
```

Expected response:
```json
{
  "status": "ok",
  "version": "2.0.0",
  "perplexity": "configured",
  "redis": "connected"
}
```

### 2. Frontend Verification
- Visit your frontend URL
- Navigate to `/trends`, `/insights`, `/tools`
- Verify data loads properly

### 3. API Integration Test
```bash
curl https://your-backend-url.onrender.com/api/market-intelligence
```

---

## 🔧 Troubleshooting

### Common Issues

#### ❌ "CORS Error" on Frontend
- **Solution**: Ensure `NEXT_PUBLIC_BACKEND_URL` is set correctly
- **Check**: Backend allows your frontend domain in CORS settings

#### ❌ "Redis Connection Failed"
- **Impact**: App works but no caching (slower responses)
- **Solution**: Set up Redis Cloud or remove `REDIS_URL` variable

#### ❌ "Perplexity API Error"
- **Impact**: App uses fallback data instead of real-time data
- **Solution**: Get valid Perplexity Sonar Pro API key

#### ❌ "Backend Not Responding"
- **Check**: Backend deployment logs
- **Verify**: Environment variables are set correctly

---

## 📈 Monitoring & Maintenance

### Performance Monitoring
- **Frontend**: Vercel Analytics (built-in)
- **Backend**: Check your platform's monitoring (Render/Railway)

### Updates & Maintenance
- **Auto-deployment**: Both platforms deploy automatically on git push
- **Environment Variables**: Update through platform UI, not in code
- **Scaling**: Both platforms auto-scale based on traffic

---

## 🛡️ Security Best Practices

1. **Never commit API keys** to repository
2. **Use environment variables** for all sensitive data
3. **Enable HTTPS** on both frontend and backend (automatic on most platforms)
4. **Monitor API usage** to prevent unexpected charges
5. **Set up alerts** for downtime or errors

---

## 💰 Cost Estimation

### Free Tier Limits
- **Vercel**: Unlimited personal projects, 100GB bandwidth
- **Netlify**: 100GB bandwidth, 300 build minutes
- **Render**: 750 hours/month (enough for 1 app)
- **Redis Cloud**: 30MB free storage

### Paid Tiers (if needed)
- **Vercel Pro**: $20/month
- **Render**: $7/month for always-on
- **Redis Cloud**: $5/month for 250MB

---

## 🎉 You're Ready to Deploy!

Follow the steps above, and your Neural Signal platform will be live and ready to serve marketing intelligence to professionals worldwide! 🚀 