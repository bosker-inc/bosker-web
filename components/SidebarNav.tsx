'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

export interface SidebarItem {
  href: string;
  label: string;
  icon: string;
}

interface SidebarNavProps {
  brand: string;
  items: SidebarItem[];
  footerItems?: SidebarItem[];
}

export function SidebarNav({ brand, items, footerItems = [] }: SidebarNavProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const renderLink = (item: SidebarItem) => {
    const active = isActive(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
          active
            ? 'bg-accent/12 text-accent'
            : 'text-muted hover:bg-surface-2 hover:text-fg'
        )}
      >
        <span className="text-base leading-none">{item.icon}</span>
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-surface md:flex md:flex-col">
      <div className="flex items-center justify-between px-6 py-5">
        <Link
          href="/dashboard"
          className="font-display text-xl font-semibold tracking-tight text-accent"
        >
          {brand}
        </Link>
        <ThemeToggle />
      </div>
      <nav className="flex-1 space-y-1 px-3">{items.map(renderLink)}</nav>
      {footerItems.length > 0 && (
        <div className="space-y-1 border-t border-border px-3 py-4">
          {footerItems.map(renderLink)}
        </div>
      )}
    </aside>
  );
}
