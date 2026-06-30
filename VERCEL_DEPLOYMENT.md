# Vercel Deployment Guide

Complete guide for deploying Bosker Web to Vercel.

---

## ✅ Pre-Deployment Checklist

- [ ] All code committed to GitHub
- [ ] `.env.example` file present
- [ ] `next.config.ts` properly configured
- [ ] `package.json` has correct scripts
- [ ] TypeScript builds without errors: `npm run type-check`
- [ ] Linting passes: `npm run lint`
- [ ] Build succeeds locally: `npm run build`

---

## 🚀 Deployment Steps

### Step 1: Push to GitHub

```bash
# Make sure all changes are committed
git status

# Push to your GitHub repository
git push origin main
# or your branch name
git push origin claude/bosker-frontend-website-nwh0dh
```

### Step 2: Connect Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository (bosker-inc/bosker-web)
4. Select the branch to deploy

### Step 3: Configure Environment Variables

In the Vercel Project Settings → Environment Variables, add:

#### Required Variables
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_BFF_URL=https://api.your-domain.com/graphql
```

#### Optional Variables
```
NEXT_PUBLIC_API_TIMEOUT=10000
NEXT_PUBLIC_GA_ID=YOUR_GOOGLE_ANALYTICS_ID
```

#### Feature Flags (Optional)
```
NEXT_PUBLIC_ENABLE_CHAT=false
NEXT_PUBLIC_ENABLE_RATINGS=true
NEXT_PUBLIC_ENABLE_BOOKMARKS=true
NEXT_PUBLIC_APP_NAME=Bosker
```

### Step 4: Build Settings

**Vercel should auto-detect these settings, but verify:**

- **Framework:** Next.js ✅ (auto-detected)
- **Build Command:** `npm run build` ✅ (default)
- **Output Directory:** `.next` ✅ (default)
- **Install Command:** `npm install` ✅ (default)
- **Node.js Version:** 18.x or later ✅

---

## 📋 Environment Variables Breakdown

### NEXT_PUBLIC_APP_URL
**Purpose:** Your application's public URL  
**Production Value:**
```
NEXT_PUBLIC_APP_URL=https://bosker.vercel.app
```
**Note:** Replace with your custom domain if available

### NEXT_PUBLIC_BFF_URL
**Purpose:** Backend API endpoint (GraphQL)  
**Production Value:**
```
NEXT_PUBLIC_BFF_URL=https://api.bosker.app/graphql
```
**Note:** Must point to your backend server

### NEXT_PUBLIC_API_TIMEOUT
**Purpose:** API request timeout in milliseconds  
**Default:** `10000` (10 seconds)  
**Recommended for production:** `10000`

### NEXT_PUBLIC_GA_ID (Optional)
**Purpose:** Google Analytics tracking ID  
**Example:**
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
**Note:** Only set if using Google Analytics

### Feature Flags
```
NEXT_PUBLIC_ENABLE_CHAT=false
NEXT_PUBLIC_ENABLE_RATINGS=true
NEXT_PUBLIC_ENABLE_BOOKMARKS=true
NEXT_PUBLIC_APP_NAME=Bosker
```

---

## 🔧 Build Scripts Reference

The `package.json` includes all necessary scripts:

```bash
# Development (not used in Vercel)
npm run dev

# Production build (used by Vercel)
npm run build

# Start production server (not needed on Vercel)
npm start

# Code quality checks (optional)
npm run lint:fix
npm run format
npm run type-check

# Testing (optional)
npm run test
npm run test:e2e
```

**Vercel will automatically run:**
1. `npm install` - Install dependencies
2. `npm run build` - Build the project
3. Deploy `.next` folder

---

## 🎯 Deployment Environments

### Preview Deployments
- Automatically created for Pull Requests
- Environment variables: Same as Production
- Auto-delete after PR is merged

### Production Deployment
- Triggered when code is pushed to `main` branch
- Uses Production environment variables
- CDN caching enabled
- Analytics enabled

### Staging (Optional)
Create a separate Vercel project for staging:
1. Connect same GitHub repo
2. Set to deploy from `develop` branch
3. Use staging environment variables

---

## ✨ Vercel Features Enabled by Default

### ✅ Automatic Features
- **HTTPS:** Automatically enabled
- **Global CDN:** Content cached worldwide
- **Edge Functions:** Ready to use
- **Automatic Deployments:** On every push
- **Git Integration:** Automatic from GitHub
- **Analytics:** Built-in Web Analytics
- **Performance Monitoring:** Automatic

### ✅ Performance Optimizations
- **Image Optimization:** Next.js Image component
- **Font Optimization:** Poppins pre-loaded
- **Code Splitting:** Automatic per route
- **Compression:** Gzip enabled
- **Caching:** Long-lived asset caching

---

## 🔒 Security Checklist

- [x] HTTPS enforced
- [x] Environment variables not committed (`.env.local` in `.gitignore`)
- [x] Security headers configured in `next.config.ts`
- [x] XSS protection enabled
- [x] CSRF prevention ready
- [x] No secrets in code
- [x] API endpoints validated

---

## 📊 Monitoring & Analytics

### Access Vercel Dashboard
1. Go to vercel.com → Your Project
2. View real-time logs and deployments
3. Check Performance Analytics

### Monitor Performance
- **Lighthouse Score:** Should be ≥95
- **Core Web Vitals:** LCP <2.5s, CLS <0.1
- **Edge Function Latency:** Monitor in Analytics

### Set Up Alerts
In Project Settings → Monitoring:
- [ ] Build failure notifications
- [ ] Performance degradation alerts
- [ ] Error rate monitoring

---

## 🚨 Troubleshooting

### Build Fails with TypeScript Error
```bash
# Verify locally
npm run type-check

# Check next.config.ts
npm run build

# Clear build cache in Vercel dashboard
# Project Settings → Git → Deployment → Redeploy
```

### Environment Variables Not Working
1. Check Vercel Project Settings
2. Verify variable names match `.env.example`
3. Redeploy project after adding variables
4. Check that variables start with `NEXT_PUBLIC_` (for client-side)

### API Connection Fails
1. Verify `NEXT_PUBLIC_BFF_URL` is correct
2. Test backend is running and accessible
3. Check CORS headers from backend
4. Review browser Network tab for errors

### Performance Issues
1. Check Vercel Analytics dashboard
2. Review Core Web Vitals
3. Check image optimization
4. Monitor API response times

---

## 🔄 Updating After Deployment

### Deploy Changes
```bash
# Make changes locally
git add .
git commit -m "Your changes"

# Push to GitHub
git push origin main

# Vercel automatically deploys
# Monitor at vercel.com
```

### Rollback to Previous Deployment
1. Go to Vercel Project → Deployments
2. Find previous working deployment
3. Click "..." → Promote to Production

---

## 📱 Custom Domain Setup

### Connect Custom Domain
1. Project Settings → Domains
2. Add your domain (e.g., `bosker.app`)
3. Follow DNS configuration steps
4. Wait for SSL certificate (usually 5 mins)

### Update Environment Variables
After adding custom domain:
```
NEXT_PUBLIC_APP_URL=https://bosker.app
```

---

## 💰 Pricing & Limits

### Free Tier (Sufficient for MVP)
- Unlimited deployments
- Automatic HTTPS
- Global CDN
- Analytics included
- 100GB bandwidth/month
- Edge Middleware (no runtime)

### Pro Tier (When You Scale)
- Priority support
- Team features
- Advanced analytics
- Increased bandwidth

---

## 🎓 Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Vercel Analytics](https://vercel.com/docs/analytics)

---

## 📝 Deployment Checklist

### Before First Deploy
- [ ] Repository is on GitHub
- [ ] All code committed
- [ ] No secrets in code
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds locally
- [ ] `.env.example` is up to date

### During Vercel Setup
- [ ] Project imported
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Production domain decided

### After Deployment
- [ ] Site loads at vercel.app URL
- [ ] Environment variables working
- [ ] API connections working
- [ ] Forms submitting correctly
- [ ] Mobile responsiveness verified
- [ ] Analytics working
- [ ] Custom domain configured (optional)

---

## 🚀 Next Steps After Deployment

1. **Test in Production**
   - Open deployed URL
   - Test all pages and forms
   - Test mobile responsiveness
   - Verify API connections

2. **Configure Monitoring**
   - Set up Sentry or similar error tracking
   - Enable Vercel analytics
   - Set up email alerts

3. **Optimize Performance**
   - Run Lighthouse audit
   - Review Core Web Vitals
   - Optimize images if needed
   - Monitor API performance

4. **Set Up CI/CD**
   - Connect automated tests
   - Add linting checks
   - Configure deployment gates

---

**Questions?** Check the Vercel documentation or review `README.md` and `IMPLEMENTATION.md` in this repository.

**Last Updated:** June 30, 2026  
**Next Phase:** Phase 4 - Advanced Features
