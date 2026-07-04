'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/technicians', label: 'Technicians' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-200',
        scrolled
          ? 'border-b border-border bg-surface/80 shadow-soft backdrop-blur-md'
          : 'border-b border-transparent bg-bg'
      )}
    >
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-tight text-accent"
          >
            Bosker
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent',
                  isActive(link.href) ? 'text-accent' : 'text-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              aria-label="Toggle menu"
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span
                className={cn(
                  'h-0.5 w-6 bg-fg transition-transform',
                  isOpen && 'translate-y-2 rotate-45'
                )}
              />
              <span
                className={cn(
                  'h-0.5 w-6 bg-fg transition-opacity',
                  isOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'h-0.5 w-6 bg-fg transition-transform',
                  isOpen && '-translate-y-2 -rotate-45'
                )}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 space-y-3 border-t border-border pt-4 md:hidden">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block py-2 font-medium transition-colors hover:text-accent',
                  isActive(link.href) ? 'text-accent' : 'text-muted'
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                <Button variant="outline" size="sm" fullWidth>
                  Login
                </Button>
              </Link>
              <Link href="/signup" className="flex-1" onClick={() => setIsOpen(false)}>
                <Button size="sm" fullWidth>
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
