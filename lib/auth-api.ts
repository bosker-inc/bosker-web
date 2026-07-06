import { env } from '@/env';
import { APIError } from '@/lib/api';

// The BFF exposes auth as REST (not GraphQL), rooted at NEXT_PUBLIC_BFF_HTTP_URL:
//   customer   → POST /auth/login                      { phone, password }
//   technician → POST /technician-auth/login           { username, password }
//              → POST /technician-auth/verify-otp       { phone, otp }
// All return an access/refresh token pair (technician nests it under tokenSet).

type TokenPair = { accessToken: string; refreshToken?: string };

async function postJson<T>(path: string, body: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${env.NEXT_PUBLIC_BFF_HTTP_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new APIError('NETWORK_ERROR', err instanceof Error ? err.message : 'Network error');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new APIError(String(data?.code ?? 'AUTH_ERROR'), data?.message ?? `HTTP ${response.status}`, response.status);
  }
  return data as T;
}

export async function customerLogin(phone: string, password: string): Promise<TokenPair> {
  const data = await postJson<{ access_token: string; refresh_token: string }>('/auth/login', { phone, password });
  return { accessToken: data.access_token, refreshToken: data.refresh_token };
}

export async function customerRegister(phone: string, password: string, name?: string): Promise<TokenPair> {
  const data = await postJson<{ access_token: string; refresh_token: string }>('/auth/register', {
    phone,
    password,
    name,
  });
  return { accessToken: data.access_token, refreshToken: data.refresh_token };
}

type TechnicianAuthResponse = {
  tokenSet: { access_token: string; refresh_token: string };
  technician: { id: string; username: string; name?: string };
};

export async function technicianLogin(
  username: string,
  password: string,
): Promise<TokenPair & { technician: TechnicianAuthResponse['technician'] }> {
  const data = await postJson<TechnicianAuthResponse>('/technician-auth/login', { username, password });
  return {
    accessToken: data.tokenSet.access_token,
    refreshToken: data.tokenSet.refresh_token,
    technician: data.technician,
  };
}

export async function technicianVerifyOtp(
  phone: string,
  otp: string,
): Promise<TokenPair & { technician: TechnicianAuthResponse['technician'] }> {
  const data = await postJson<TechnicianAuthResponse>('/technician-auth/verify-otp', { phone, otp });
  return {
    accessToken: data.tokenSet.access_token,
    refreshToken: data.tokenSet.refresh_token,
    technician: data.technician,
  };
}
