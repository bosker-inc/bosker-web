import { ReactNode } from 'react';
import { SidebarNav, type SidebarItem } from '@/components/SidebarNav';
import { RequireAuth } from '@/components/RequireAuth';

const ITEMS: SidebarItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/bookings', label: 'Bookings', icon: '📅' },
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
        <div className="flex-1">{children}</div>
      </div>
    </RequireAuth>
  );
}
