import { request } from '@/lib/api';
import { AppNotification, User } from '@/lib/types';

// GraphQL operations for notifications, against the BFF. Queries/mark-read are
// role-scoped (the BFF picks customer vs technician by the caller's token), so we
// select the right op by the current user's role.

const NOTIFICATION_FIELDS = `id title content type receiver_type receiver_ids read_by sent_date created_at`;

type Role = User['role'];

export async function getNotifications(role: Role, skip = 0, take = 20): Promise<AppNotification[]> {
  const op = role === 'technician' ? 'getTechnicianNotifications' : 'getCustomerNotifications';
  const data = await request<Record<string, { data: AppNotification[]; total: number }>>(
    `query ($skip: Int, $take: Int) { ${op}(skip: $skip, take: $take) { data { ${NOTIFICATION_FIELDS} } total } }`,
    { skip, take }
  );
  return data[op].data;
}

export async function markNotificationRead(role: Role, id: string): Promise<void> {
  const op = role === 'technician' ? 'markTechnicianNotificationAsRead' : 'markCustomerNotificationAsRead';
  await request(`mutation ($id: String!) { ${op}(id: $id) { id } }`, { id });
}

export async function markAllNotificationsRead(role: Role): Promise<number> {
  const op = role === 'technician' ? 'markAllTechnicianNotificationsAsRead' : 'markAllCustomerNotificationsAsRead';
  const data = await request<Record<string, { count: number }>>(`mutation { ${op} { count } }`);
  return data[op].count;
}

export const NOTIFICATION_CREATED_SUBSCRIPTION = `
  subscription ($userId: String!) {
    onNotificationCreated(userId: $userId) { ${NOTIFICATION_FIELDS} }
  }
`;

/** A notification is unread for a viewer when their id is not in read_by. */
export function isUnread(n: AppNotification, userId: string | null): boolean {
  return !userId || !n.read_by.includes(userId);
}
