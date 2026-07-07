import { env } from '@/env';
import { getToken } from '@/lib/auth-storage';

export class APIError extends Error {
  constructor(
    public code: string,
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function request<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    env.NEXT_PUBLIC_API_TIMEOUT
  );

  try {
    const token = getToken();
    const response = await fetch(env.NEXT_PUBLIC_BFF_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new APIError(
        'HTTP_ERROR',
        `HTTP ${response.status}`,
        response.status
      );
    }

    const data = await response.json();

    if (data.errors) {
      const error = data.errors[0];
      throw new APIError(
        error.extensions?.code || 'GRAPHQL_ERROR',
        error.message
      );
    }

    return data.data as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof APIError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new APIError('TIMEOUT', 'Request timeout');
      }
      throw new APIError('NETWORK_ERROR', error.message);
    }

    throw new APIError('UNKNOWN_ERROR', 'An unknown error occurred');
  }
}

export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(env.NEXT_PUBLIC_BFF_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ __typename }',
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

export const graphqlClient = {
  request,
  healthCheck,
};
