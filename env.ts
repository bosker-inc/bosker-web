import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().default('Bosker'),
  NEXT_PUBLIC_BFF_URL: z.string().url().default('http://localhost:3001/graphql'),
  NEXT_PUBLIC_API_TIMEOUT: z.coerce.number().default(10000),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_ENABLE_CHAT: z.enum(['true', 'false']).default('false'),
  NEXT_PUBLIC_ENABLE_RATINGS: z.enum(['true', 'false']).default('true'),
  NEXT_PUBLIC_ENABLE_BOOKMARKS: z.enum(['true', 'false']).default('true'),
});

type Env = z.infer<typeof envSchema>;

const env = envSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_BFF_URL: process.env.NEXT_PUBLIC_BFF_URL,
  NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_ENABLE_CHAT: process.env.NEXT_PUBLIC_ENABLE_CHAT,
  NEXT_PUBLIC_ENABLE_RATINGS: process.env.NEXT_PUBLIC_ENABLE_RATINGS,
  NEXT_PUBLIC_ENABLE_BOOKMARKS: process.env.NEXT_PUBLIC_ENABLE_BOOKMARKS,
});

export { env };
export type { Env };
