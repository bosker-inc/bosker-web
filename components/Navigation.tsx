'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/technicians', label: 'Technicians' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Bosker
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-700 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={cn(
                'w-6 h-0.5 bg-neutral-900 transition-transform',
                isOpen && 'rotate-45 translate-y-2'
              )}
            />
            <div
              className={cn(
                'w-6 h-0.5 bg-neutral-900 transition-opacity',
                isOpen && 'opacity-0'
              )}
            />
            <div
              className={cn(
                'w-6 h-0.5 bg-neutral-900 transition-transform',
                isOpen && '-rotate-45 -translate-y-2'
              )}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-neutral-200 pt-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-neutral-700 hover:text-primary-600 py-2"
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
