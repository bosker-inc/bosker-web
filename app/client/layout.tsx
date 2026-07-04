import { ReactNode } from 'react';
import { SidebarNav, type SidebarItem } from '@/components/SidebarNav';

const ITEMS: SidebarItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/bookings', label: 'My Bookings', icon: '📅' },
  { href: '/favorites', label: 'Favorites', icon: '❤️' },
  { href: '/profile', label: 'Profile', icon: '👤' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

const FOOTER: SidebarItem[] = [
  { href: '/logout', label: 'Logout', icon: '🚪' },
];

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg">
      <SidebarNav brand="Bosker" items={ITEMS} footerItems={FOOTER} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
