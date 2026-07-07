'use client';

import { useNotifications } from '@/hooks/useNotifications';
import { isUnread } from '@/lib/notifications-api';
import { AppNotification } from '@/lib/types';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { Card, CardBody } from '@/components/Card';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { cn } from '@/lib/utils';

const TYPE_ACCENT: Record<AppNotification['type'], string> = {
  info: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-danger',
};

export function NotificationsList() {
  const { items, unreadCount, markRead, markAllRead, userId } = useNotifications();

  return (
    <main className="p-8 bg-bg min-h-screen">
      <div className="max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="h1 text-fg">Notifications</h1>
            <p className="text-muted mt-1">{unreadCount ? `${unreadCount} unread` : 'All caught up'}</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              Mark all read
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyState icon="🔔" title="No notifications yet" description="Updates about your bookings will show up here." />
        ) : (
          <StaggerGroup className="space-y-3">
            {items.map((n) => {
              const unread = isUnread(n, userId);
              return (
                <StaggerItem key={n.id}>
                  <div onClick={() => unread && markRead(n.id)} className={cn(unread && 'cursor-pointer')}>
                    <Card variant={unread ? 'emphasis' : 'default'}>
                      <CardBody className={cn('flex items-start gap-4', unread && 'bg-accent/[0.04]')}>
                        <span className={cn('mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full', unread ? TYPE_ACCENT[n.type] : 'bg-border')} />
                        <div className="min-w-0 flex-1">
                          <p className={cn('text-fg', unread ? 'font-semibold' : 'font-medium')}>{n.title}</p>
                          <p className="text-sm text-muted">{n.content}</p>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        )}
      </div>
    </main>
  );
}
