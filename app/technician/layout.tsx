import { ReactNode } from 'react';
import { SidebarNav, type SidebarItem } from '@/components/SidebarNav';
import { RequireAuth } from '@/components/RequireAuth';
import { NotificationBell } from '@/components/NotificationBell';

const ITEMS: SidebarItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/bookings', label: 'Bookings', icon: '📅' },
  { href: '/notifications', label: 'Notifications', icon: '🔔' },
  { href: '/availability', label: 'Availability', icon: '🗓️' },
  { href: '/profile', label: 'My Profile', icon: '👤' },
];

const FOOTER: SidebarItem[] = [
  { href: '/logout', label: 'Logout', icon: '🚪' },
];

export default function TechnicianLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RequireAuth role="technician">
      <div className="flex min-h-screen bg-bg">
        <SidebarNav brand="Bosker" items={ITEMS} footerItems={FOOTER} />
        <div className="flex-1">
          <div className="flex items-center justify-end border-b border-border bg-surface/60 px-6 py-3 backdrop-blur">
            <NotificationBell />
          </div>
          {children}
        </div>
      </div>
    </RequireAuth>
  );
}
