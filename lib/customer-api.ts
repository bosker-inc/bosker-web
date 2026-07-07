import { request } from '@/lib/api';
import { getUserId } from '@/lib/auth-storage';

// Customer profile (BFF customer service). The BFF derives the real user from the
// forwarded token; the userId arg is required by the schema but not authoritative.

export interface CustomerProfile {
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string | null;
  avatar: string | null;
  pushNotification: boolean;
}

const PROFILE_FIELDS = `firstName lastName email phoneNumber avatar pushNotification`;

export async function getUserProfile(): Promise<CustomerProfile> {
  const data = await request<{ getUserProfile: CustomerProfile }>(`{ getUserProfile { ${PROFILE_FIELDS} } }`);
  return data.getUserProfile;
}

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  pushNotification?: boolean;
}

export async function updateUserProfile(input: UpdateProfileInput): Promise<CustomerProfile> {
  const data = await request<{ updateUserProfile: CustomerProfile }>(
    `mutation ($userId: String!, $input: UpdateUserProfileInput!) {
      updateUserProfile(userId: $userId, input: $input) { ${PROFILE_FIELDS} }
    }`,
    { userId: getUserId() ?? 'me', input }
  );
  return data.updateUserProfile;
}
