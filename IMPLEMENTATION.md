# Bosker Web - Implementation Guide

## 📋 Complete Architecture Overview

### Phase 1: Foundation (✅ Complete)

A production-ready Next.js 15 project with:
- Design system with brand colors
- 5 fully functional UI components
- 2 custom hooks (Auth + Search)
- GraphQL API client
- Form validation layer
- Complete TypeScript strict mode
- ESLint + Prettier configured

## 🏗️ Project Structure

```
bosker-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── providers.tsx            # Theme providers
│   ├── page.tsx                 # Home page
│   ├── (public)/                # Public route group (create)
│   │   ├── services/page.tsx
│   │   ├── technicians/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   └── (customer)/              # Protected route group (create)
│       ├── dashboard/page.tsx
│       ├── profile/page.tsx
│       └── bookings/page.tsx
│
├── components/                   # Reusable UI components
│   ├── Button.tsx               # ✅ Primary button (5 variants)
│   ├── Card.tsx                 # ✅ Card container
│   ├── Input.tsx                # ✅ Form input
│   ├── Textarea.tsx             # ✅ Multi-line input
│   ├── Skeleton.tsx             # ✅ Loading skeleton
│   ├── Navigation.tsx           # 🔧 To create
│   ├── Footer.tsx               # 🔧 To create
│   ├── Modal.tsx                # 🔧 To create
│   └── ...more
│
├── features/                     # Feature modules
│   ├── home/
│   │   ├── components/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServiceCategories.tsx
│   │   │   ├── FeaturedTechnicians.tsx
│   │   │   └── Testimonials.tsx
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── validation.ts
│   ├── technician-directory/
│   │   ├── components/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── TechnicianCard.tsx
│   │   │   └── FilterPanel.tsx
│   │   └── hooks/
│   ├── services/
│   ├── auth/
│   ├── customer-dashboard/
│   └── profile/
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts               # ✅ Authentication state
│   └── useTechnicianSearch.ts   # ✅ Search & filtering
│
├── lib/                          # Utilities & configuration
│   ├── api.ts                   # ✅ GraphQL client
│   ├── types.ts                 # ✅ Type definitions
│   ├── validation.ts            # ✅ Zod schemas
│   ├── utils.ts                 # ✅ Helper functions
│   └── constants.ts             # 🔧 To create
│
├── styles/
│   └── globals.css              # ✅ Global styles + Tailwind
│
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
└── Configuration
    ├── package.json             # ✅ Dependencies
    ├── tsconfig.json            # ✅ TypeScript strict
    ├── tailwind.config.ts       # ✅ Design tokens
    ├── next.config.ts           # ✅ Next.js config
    ├── env.ts                   # ✅ Environment validation
    ├── postcss.config.js        # ✅ CSS processing
    ├── .eslintrc.json           # ✅ Code quality
    ├── .prettierrc              # ✅ Code formatting
    ├── .env.example             # ✅ Environment template
    └── .gitignore               # ✅ Git exclusions
```

## 🎨 Design Tokens

### Colors
```typescript
// Primary brand color
primary-600: #9D2BEE

// Semantic colors
success: #10b981
warning: #f59e0b
error: #ef4444
info: #3b82f6

// Neutral scale (50-950)
neutral-50 to neutral-950
```

### Typography
- **Font:** Poppins
- **Weights:** 400, 500, 600, 700
- **Sizes:** xs, sm, base, lg, xl, 2xl, 3xl, 4xl

### Spacing Scale
- xs: 0.5rem
- sm: 0.75rem
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- 2xl: 2.5rem
- 3xl: 3rem
- 4xl: 4rem
- 5xl: 5rem

## ✅ Completed Components

### 1. Button
- 5 variants: primary, secondary, outline, ghost, danger
- Loading states
- Size options: sm, md, lg
- Full width support

### 2. Card
- Header, body, footer sections
- Hoverable option
- Customizable styling

### 3. Input
- Label support
- Error display
- Helper text
- Icon support
- Full width option

### 4. Textarea
- Same features as Input
- Multi-line support
- Resizable

### 5. Skeleton
- Loading animation
- Flexible sizing
- SkeletonCard preset

## 🪝 Custom Hooks

### useAuth
```typescript
const { user, login, signup, logout, updateProfile } = useAuth();

// Methods
login(email: string, password: string)
signup(email: string, password: string, name: string)
logout()
updateProfile(updates: Partial<User>)

// State
user: User | null
isLoading: boolean
error: string | null
isLoggedIn: boolean
isInitialized: boolean
```

### useTechnicianSearch
```typescript
const { technicians, search, nextPage, previousPage } = useTechnicianSearch();

// Methods
search(filters: SearchFilters)
nextPage()
previousPage()
clearFilters()

// State
technicians: Technician[]
results: SearchResults<Technician> | null
isLoading: boolean
error: string | null
filters: SearchFilters
```

## 📡 API Integration

### GraphQL Client Setup

```typescript
import { request } from '@/lib/api';

const QUERY = `
  query GetTechnicians($limit: Int) {
    technicians(limit: $limit) {
      id
      name
      rating
    }
  }
`;

const data = await request<{ technicians: Technician[] }>(
  QUERY,
  { limit: 12 }
);
```

### Error Handling

```typescript
import { APIError } from '@/lib/api';

try {
  const data = await request(QUERY, variables);
} catch (error) {
  if (error instanceof APIError) {
    console.error(`[${error.code}] ${error.message}`);
  }
}
```

## 🧪 Validation

### Using Zod with React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validation';

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input
        {...form.register('email')}
        error={form.formState.errors.email?.message}
      />
    </form>
  );
}
```

## 🔨 Development Workflow

### Create a New Component

```typescript
// components/NewComponent.tsx
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface NewComponentProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function NewComponent({
  children,
  variant = 'primary',
  className,
}: NewComponentProps) {
  return (
    <div className={cn(
      'base-classes',
      variant === 'primary' && 'primary-classes',
      className
    )}>
      {children}
    </div>
  );
}
```

### Create a New Page

```typescript
// app/(public)/services/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Browse our beauty services',
};

export default async function ServicesPage() {
  return (
    <main>
      <h1>Services</h1>
    </main>
  );
}
```

### Create a Feature Module

```
features/my-feature/
├── components/
│   ├── MyFeatureCard.tsx
│   └── MyFeatureForm.tsx
├── hooks/
│   └── useMyFeature.ts
├── types.ts
├── validation.ts
└── constants.ts
```

## 🚀 Phase 2: Landing Page Development

### Components to Build

1. **Navigation Bar**
   - Responsive mobile/desktop
   - Logo
   - Menu items
   - Auth buttons

2. **Hero Section**
   - Headline
   - Subheadline
   - CTA buttons
   - Background image

3. **Service Categories**
   - Card grid
   - Icons
   - Descriptions
   - Link to service page

4. **Featured Technicians**
   - Card display
   - Rating stars
   - Quick info
   - Link to profile

5. **Why Bosker Section**
   - Features list
   - Icons
   - Descriptions

6. **Testimonials**
   - Carousel
   - Customer quote
   - Rating
   - Customer name/avatar

7. **Footer**
   - Links
   - Social media
   - Newsletter signup
   - Copyright

### Pages to Create

- `app/(public)/page.tsx` - Home page
- `app/(public)/services/page.tsx` - Services directory
- `app/(public)/technicians/page.tsx` - Technician directory
- `app/(public)/about/page.tsx` - About page
- `app/(public)/how-it-works/page.tsx` - How it works
- `app/(public)/faq/page.tsx` - FAQ page
- `app/(public)/contact/page.tsx` - Contact form

## 📊 Performance Checklist

- [ ] Images optimized (use next/image)
- [ ] Fonts preloaded (Poppins in globals.css)
- [ ] Code split by route (automatic)
- [ ] Server Components used by default
- [ ] Client Components only when needed
- [ ] Lighthouse audit ≥95
- [ ] LCP < 2.5s
- [ ] CLS < 0.1

## ♿ Accessibility Checklist

- [ ] Semantic HTML used
- [ ] ARIA labels added
- [ ] Keyboard navigation tested
- [ ] Focus indicators visible
- [ ] Color contrast >= 4.5:1
- [ ] Screen reader tested
- [ ] Reduced motion respected

## 🧪 Testing Strategy

### Unit Tests (Vitest)
```bash
npm run test
```

### E2E Tests (Playwright)
```bash
npm run test:e2e
```

### TypeScript Type Check
```bash
npm run type-check
```

### Linting
```bash
npm run lint:fix
```

## 🚢 Deployment Checklist

- [ ] All environment variables configured
- [ ] API endpoints validated
- [ ] Build passes: `npm run build`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No linting issues: `npm run lint`
- [ ] Tests passing: `npm run test`
- [ ] Lighthouse audit ≥95
- [ ] SEO metadata added to all pages
- [ ] robots.txt configured
- [ ] Sitemap generated

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `env.ts` | Environment validation |
| `lib/types.ts` | Type definitions |
| `lib/validation.ts` | Zod schemas |
| `lib/api.ts` | GraphQL client |
| `lib/utils.ts` | Helper functions |
| `tailwind.config.ts` | Design tokens |
| `next.config.ts` | Performance & security |
| `components/Button.tsx` | Component pattern |
| `hooks/useAuth.ts` | Hook pattern |

## 🎯 Next Steps

1. **Install dependencies:** `npm install`
2. **Create .env.local** from `.env.example`
3. **Start dev server:** `npm run dev`
4. **Build landing page** (Phase 2)
5. **Add API integration**
6. **Create pages** (services, technicians, etc.)
7. **Build feature modules**
8. **Add authentication**
9. **Deploy to Vercel**

---

**Status:** Phase 1 Complete ✅  
**Ready for:** Phase 2 - Landing Page Development
