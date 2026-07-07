'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppNotification, User } from '@/lib/types';
import { getSession, getUserId } from '@/lib/auth-storage';
import {
  NOTIFICATION_CREATED_SUBSCRIPTION,
  getNotifications,
  isUnread,
  markAllNotificationsRead,
  markNotificationRead,
} from '@/lib/notifications-api';
import { subscribe } from '@/lib/subscriptions';

/**
 * Notifications for the signed-in user: hydrates the list over HTTP, then
 * prepends new ones from the onNotificationCreated subscription in realtime.
 * Exposes unread count, a "latest arrival" (for toasts), and read mutations.
 */
export function useNotifications() {
  const [items, setItems] = useState<AppNotification[]>([]);
  const [latest, setLatest] = useState<AppNotification | null>(null);
  const userId = getUserId();
  const role: User['role'] = getSession()?.user.role ?? 'customer';

  useEffect(() => {
    let active = true;
    getNotifications(role).then((list) => active && setItems(list)).catch(() => {});

    if (!userId) return;
    const unsubscribe = subscribe<{ onNotificationCreated: AppNotification }>(
      NOTIFICATION_CREATED_SUBSCRIPTION,
      { userId },
      (data) => {
        if (!active) return;
        const n = data.onNotificationCreated;
        setItems((prev) => (prev.some((p) => p.id === n.id) ? prev : [n, ...prev]));
        setLatest(n);
      }
    );
    return () => {
      active = false;
      unsubscribe();
    };
    // role/userId are stable for a session
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unreadCount = useMemo(() => items.filter((n) => isUnread(n, userId)).length, [items, userId]);

  const markRead = useCallback(
    async (id: string) => {
      setItems((prev) =>
        prev.map((n) => (n.id === id && userId ? { ...n, read_by: [...n.read_by, userId] } : n))
      );
      await markNotificationRead(role, id).catch(() => {});
    },
    [role, userId]
  );

  const markAllRead = useCallback(async () => {
    setItems((prev) => prev.map((n) => (userId ? { ...n, read_by: [...new Set([...n.read_by, userId])] } : n)));
    await markAllNotificationsRead(role).catch(() => {});
  }, [role, userId]);

  const clearLatest = useCallback(() => setLatest(null), []);

  return { items, unreadCount, latest, clearLatest, markRead, markAllRead, userId };
}
