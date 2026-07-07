'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { type SidebarItem } from '@/components/SidebarNav';
import { NotificationBell } from '@/components/NotificationBell';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

interface PortalHeaderProps {
  brand: string;
  items: SidebarItem[];
  footerItems?: SidebarItem[];
}

/**
 * Portal top bar. On md+ it's just the notification bell (the SidebarNav handles
 * navigation). Below md the sidebar is hidden, so this adds a hamburger that opens
 * a slide-in drawer with the full nav — including Logout — making it reachable on
 * mobile.
 */
export function PortalHeader({ brand, items, footerItems = [] }: PortalHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const renderLink = (item: SidebarItem) => (
    <Link
      key={item.href}
      href={item.href}
      onClick={() => setOpen(false)}
      aria-current={isActive(item.href) ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
        isActive(item.href) ? 'bg-accent/12 text-accent' : 'text-muted hover:bg-surface-2 hover:text-fg'
      )}
    >
      <span className="text-base leading-none">{item.icon}</span>
      <span>{item.label}</span>
    </Link>
  );

  return (
    <>
      <div className="flex items-center justify-between border-b border-border bg-surface/60 px-4 py-3 backdrop-blur md:justify-end md:px-6">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-fg transition-colors hover:bg-surface-2 focus-ring md:hidden"
        >
          <span className="text-xl leading-none">☰</span>
        </button>
        <NotificationBell />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="absolute left-0 top-0 flex h-full w-64 flex-col border-r border-border bg-surface"
              initial={reduce ? { opacity: 0 } : { x: '-100%' }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: '-100%' }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <div className="flex items-center justify-between px-6 py-5">
                <span className="font-display text-xl font-semibold tracking-tight text-accent">{brand}</span>
                <ThemeToggle />
              </div>
              <nav className="flex-1 space-y-1 px-3">{items.map(renderLink)}</nav>
              {footerItems.length > 0 && (
                <div className="space-y-1 border-t border-border px-3 py-4">{footerItems.map(renderLink)}</div>
              )}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
