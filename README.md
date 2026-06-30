# Bosker Web - Customer Interface

A modern, fast, and accessible web platform for discovering and booking beauty services. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🎯 Overview

Bosker Web serves as the company's public-facing website and customer portal, featuring:

- **Service Discovery** - Browse beauty service categories
- **Technician Directory** - Search and filter beauty professionals
- **Technician Profiles** - View certifications, reviews, and portfolios
- **Customer Portal** - Manage bookings, profile, and preferences
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Performance Optimized** - Lighthouse scores ≥95
- **Accessibility First** - WCAG AA compliant

## ✨ Features

### Public Section
- Home page with service showcase
- Service categories and descriptions
- Technician directory with search/filter
- Individual technician profiles
- About, How It Works, FAQ pages
- Contact form

### Customer Portal
- Secure login/signup
- Profile management
- Booking history
- Saved/bookmarked technicians
- Account settings

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
bosker-web/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── features/            # Feature-specific modules
├── hooks/               # Custom React hooks
├── lib/                 # Utilities, API, types
├── styles/              # Global styles
├── public/              # Static assets
└── Configuration files
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
npm run test         # Run unit tests
npm run test:e2e     # E2E tests with Playwright
```

## 🎨 Design System

- **Primary Color:** #9D2BEE (Bosker Purple)
- **Font:** Poppins (sans-serif)
- **Responsive Breakpoints:** Mobile-first approach
- **Accessible Components:** WCAG AA compliant

## 📡 API Integration

The app consumes the Bosker BFF GraphQL API. Configuration in `lib/api.ts`.

### Environment Variables

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BFF_URL=http://localhost:3001/graphql
NEXT_PUBLIC_API_TIMEOUT=10000
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Vercel automatically deploys
```

### Environment Variables (in Vercel)
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_BFF_URL`

## 📚 Documentation

- **IMPLEMENTATION.md** - Detailed implementation guide
- **QUICK_REFERENCE.md** - Developer quick reference

## 🔒 Security

- CORS configured for BFF
- Content Security Policy headers
- XSS protection
- Environment validation

## 🤝 Contributing

1. Create feature branch (`git checkout -b feature/name`)
2. Commit changes (`git commit -am 'Add feature'`)
3. Push to branch (`git push origin feature/name`)
4. Create Pull Request

---

**Version:** 0.1.0  
**Built with:** Next.js 15 + TypeScript + Tailwind CSS
