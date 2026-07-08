import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().default('Bosker'),
  NEXT_PUBLIC_ROOT_DOMAIN: z.string().default('localhost:3000'),
  NEXT_PUBLIC_BFF_URL: z.string().url().default('http://localhost:3001/gql'),
  // REST base for the BFF auth endpoints (/auth/login, /technician-auth/*).
  NEXT_PUBLIC_BFF_HTTP_URL: z.string().url().default('http://localhost:3001'),
  // graphql-ws endpoint for realtime booking/technician subscriptions.
  NEXT_PUBLIC_BFF_WS_URL: z.string().default('ws://localhost:3001/gql'),
  NEXT_PUBLIC_API_TIMEOUT: z.coerce.number().default(10000),
  // Stripe publishable key (safe to expose to the browser). The payment step is
  // disabled with a clear message when this is blank.
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().default(''),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_ENABLE_CHAT: z.enum(['true', 'false']).default('false'),
  NEXT_PUBLIC_ENABLE_RATINGS: z.enum(['true', 'false']).default('true'),
  NEXT_PUBLIC_ENABLE_BOOKMARKS: z.enum(['true', 'false']).default('true'),
});

type Env = z.infer<typeof envSchema>;

const env = envSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
  NEXT_PUBLIC_BFF_URL: process.env.NEXT_PUBLIC_BFF_URL,
  NEXT_PUBLIC_BFF_HTTP_URL: process.env.NEXT_PUBLIC_BFF_HTTP_URL,
  NEXT_PUBLIC_BFF_WS_URL: process.env.NEXT_PUBLIC_BFF_WS_URL,
  NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_ENABLE_CHAT: process.env.NEXT_PUBLIC_ENABLE_CHAT,
  NEXT_PUBLIC_ENABLE_RATINGS: process.env.NEXT_PUBLIC_ENABLE_RATINGS,
  NEXT_PUBLIC_ENABLE_BOOKMARKS: process.env.NEXT_PUBLIC_ENABLE_BOOKMARKS,
});

export { env };
export type { Env };
