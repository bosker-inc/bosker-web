import { createClient, Client } from 'graphql-ws';

import { env } from '@/env';
import { getToken } from '@/lib/auth-storage';

// Lazily-created singleton graphql-ws client. Auth travels in connectionParams so
// the BFF can authorize the socket the same way it authorizes HTTP (Bearer token).
let client: Client | null = null;

function getClient(): Client {
  if (client) return client;
  client = createClient({
    url: env.NEXT_PUBLIC_BFF_WS_URL,
    connectionParams: () => {
      const token = getToken();
      return token ? { authorization: `Bearer ${token}` } : {};
    },
    lazy: true,
    retryAttempts: 5,
  });
  return client;
}

/**
 * Subscribes to a GraphQL subscription and invokes `onData` for each event.
 * Returns an unsubscribe function — call it on component unmount.
 */
export function subscribe<T>(
  query: string,
  variables: Record<string, unknown>,
  onData: (data: T) => void,
  onError?: (err: unknown) => void,
): () => void {
  const dispose = getClient().subscribe<T>(
    { query, variables },
    {
      next: (result) => {
        if (result.data) onData(result.data);
      },
      error: (err) => onError?.(err),
      complete: () => {},
    },
  );
  return dispose;
}
