'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useNotifications } from '@/hooks/useNotifications';
import { isUnread } from '@/lib/notifications-api';
import { AppNotification } from '@/lib/types';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

const TYPE_ACCENT: Record<AppNotification['type'], string> = {
  info: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-danger',
};

function timeAgo(iso: string): string {
  const d = new Date(iso).getTime();
  if (Number.isNaN(d)) return '';
  const s = Math.floor((Date.now() - d) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export function NotificationBell() {
  const { items, unreadCount, latest, clearLatest, markRead, markAllRead, userId } = useNotifications();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Close the dropdown on outside click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Auto-dismiss the transient toast for a freshly-arrived notification.
  useEffect(() => {
    if (!latest) return;
    const t = setTimeout(clearLatest, 5000);
    return () => clearTimeout(t);
  }, [latest, clearLatest]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
        className="relative rounded-lg p-2 text-fg transition-colors hover:bg-surface-2 focus-ring"
      >
        <span className="text-xl leading-none">🔔</span>
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              key="badge"
              initial={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute right-0 z-50 mt-2 w-80 origin-top-right overflow-hidden rounded-xl border border-border bg-surface shadow-floating"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-semibold text-fg">Notifications</span>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs font-medium text-accent hover:underline">
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {items.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-muted">You&apos;re all caught up ✨</p>
              )}
              {items.map((n, i) => {
                const unread = isUnread(n, userId);
                return (
                  <motion.button
                    key={n.id}
                    type="button"
                    onClick={() => unread && markRead(n.id)}
                    initial={reduce ? false : { opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: EASE, delay: reduce ? 0 : Math.min(i * 0.03, 0.3) }}
                    className={cn(
                      'flex w-full items-start gap-3 border-b border-border/60 px-4 py-3 text-left transition-colors hover:bg-surface-2',
                      unread && 'bg-accent/[0.04]'
                    )}
                  >
                    <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', unread ? TYPE_ACCENT[n.type] : 'bg-transparent')} />
                    <span className="min-w-0 flex-1">
                      <span className={cn('block text-sm', unread ? 'font-semibold text-fg' : 'text-fg')}>{n.title}</span>
                      <span className="block truncate text-xs text-muted">{n.content}</span>
                      <span className="mt-0.5 block text-[10px] text-muted">{timeAgo(n.sent_date)}</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transient toast for a freshly-arrived notification */}
      <AnimatePresence>
        {latest && (
          <motion.div
            key={latest.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, x: 8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-4 right-4 z-[60] flex max-w-sm items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-floating"
            role="alert"
          >
            <span className={cn('mt-1 h-2.5 w-2.5 shrink-0 rounded-full', TYPE_ACCENT[latest.type])} />
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-fg">{latest.title}</span>
              <span className="block text-xs text-muted">{latest.content}</span>
            </span>
            <button onClick={clearLatest} aria-label="Dismiss" className="ml-2 text-muted hover:text-fg">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
