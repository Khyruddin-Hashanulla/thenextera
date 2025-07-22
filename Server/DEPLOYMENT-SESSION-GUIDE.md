# Production Session Persistence Guide

## 🚀 Deployment Session Configuration

This guide addresses the automatic logout/redirect issue that occurs after deployment when users try to view, create, or delete courses.

## ✅ Fixes Applied

### 1. Enhanced Session Store Configuration
- **MongoDB TTL**: 30 days with native MongoDB TTL handling
- **Auto-removal**: Automatic cleanup of expired sessions
- **Connection stability**: Custom serialization/deserialization
- **Collection naming**: Dedicated 'sessions' collection

### 2. Production Session Middleware
- **Rolling sessions**: Session expiry resets on each request
- **Custom session name**: 'nextera.sid' for better tracking
- **Proxy trust**: Proper proxy handling in production
- **Unset behavior**: Clean session destruction

### 3. Cookie Configuration
- **Secure cookies**: HTTPS-only in production
- **SameSite**: 'none' for cross-origin requests in production
- **HttpOnly**: XSS protection
- **Domain**: Auto-handled by browser

## 🔧 Required Environment Variables

Ensure these are set in your deployment platform:

```bash
NODE_ENV=production
SESSION_SECRET=your-super-secure-random-string-here
ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/database
RENDER=true  # (or VERCEL=true, NETLIFY=true depending on platform)
```

## 🧪 Testing Session Persistence

### Local Testing
```bash
# Test session creation
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","password":"your-password"}' \
  --cookie-jar cookies.txt

# Test session persistence
curl -X GET http://localhost:8081/api/courses \
  --cookie cookies.txt

# Check session debug info
curl -X GET http://localhost:8081/debug/session \
  --cookie cookies.txt
```

### Production Testing
Replace `localhost:8081` with your production URL and test the same endpoints.

## 🔍 Monitoring Session Issues

### Server Logs to Watch
- `✅ MongoDB session store connected successfully`
- `❌ MongoDB session store error:` (indicates connection issues)
- `⚠️ MongoDB session store disconnected` (temporary disconnection)

### Common Production Issues & Solutions

#### Issue: Sessions expire too quickly
**Solution**: Check if `rolling: true` is working - sessions should reset expiry on each request

#### Issue: Cross-origin cookie problems
**Solution**: Verify CORS origins include your frontend domain and `credentials: true` is set

#### Issue: MongoDB connection timeouts
**Solution**: Check MongoDB Atlas connection limits and network access rules

#### Issue: Proxy configuration problems
**Solution**: Ensure `app.set('trust proxy', 1)` and `proxy: isProduction` are set

## 📊 Session Debugging

### Debug Endpoint
Visit `/debug/session` on your deployed backend to check:
- Session existence and ID
- Authentication status
- Cookie configuration
- Environment detection

### Expected Production Output
```json
{
  "hasSession": true,
  "sessionData": {
    "userId": "...",
    "userRole": "...",
    "isAuthenticated": true
  },
  "sessionConfig": {
    "secure": true,
    "sameSite": "none",
    "httpOnly": true,
    "maxAge": 2592000000
  }
}
```

## 🚨 Troubleshooting

### If users still get redirected to login:

1. **Check session store connection**:
   - Look for MongoDB connection errors in logs
   - Verify ATLASDB_URL is correct

2. **Verify cookie transmission**:
   - Check browser dev tools → Application → Cookies
   - Ensure session cookie is being sent with requests

3. **Test authentication middleware**:
   - Check if `req.session.isAuthenticated` is true
   - Verify `req.session.userId` exists

4. **Monitor session expiry**:
   - Sessions should reset expiry on each request (rolling: true)
   - Check if maxAge is appropriate for your use case

## 🔄 Deployment Checklist

- [ ] All environment variables set in deployment platform
- [ ] MongoDB Atlas allows connections from deployment platform
- [ ] Frontend VITE_API_URL points to correct backend URL
- [ ] CORS origins include frontend domain
- [ ] SSL certificate is properly configured
- [ ] Session debug endpoint accessible
- [ ] Test login → course access flow after deployment

## 📞 Support

If issues persist after following this guide:
1. Check deployment platform logs for session store errors
2. Test the debug endpoint to verify session configuration
3. Monitor MongoDB Atlas connection metrics
4. Verify all environment variables are correctly set

The enhanced session configuration should resolve the automatic logout issues you experienced after deployment.
