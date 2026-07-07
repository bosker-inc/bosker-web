'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getUserProfile } from '@/lib/customer-api';
import { getCategoriesWithServices, type CategoryWithServices } from '@/lib/booking-api';
import { bookingGroup, statusBadgeVariant, statusLabel } from '@/lib/booking-status';
import { useCustomerBookings } from '@/hooks/useCustomerBookings';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { CountUp } from '@/components/motion/CountUp';
import { SkeletonCard } from '@/components/Skeleton';

function fmtDate(iso: string | null): string {
  if (!iso) return 'Flexible time';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? 'Flexible time' : d.toLocaleString();
}

export default function DashboardPage() {
  const { bookings, loading } = useCustomerBookings();
  const [firstName, setFirstName] = useState('');
  const [categories, setCategories] = useState<CategoryWithServices[]>([]);

  useEffect(() => {
    getUserProfile().then((p) => setFirstName(p.firstName)).catch(() => {});
    getCategoriesWithServices().then(setCategories).catch(() => {});
  }, []);

  const stats = useMemo(() => {
    const upcoming = bookings.filter((b) => bookingGroup(b.status) === 'Upcoming');
    const completed = bookings.filter((b) => bookingGroup(b.status) === 'Completed');
    return { total: bookings.length, upcoming, completed: completed.length };
  }, [bookings]);

  return (
    <main className="p-8 bg-bg min-h-screen">
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="h1 text-fg">Welcome back{firstName ? `, ${firstName}` : ''}! 👋</h1>
          <p className="text-muted mt-2">Here&apos;s what&apos;s happening with your bookings</p>
        </div>

        {/* Stats (real counts; spend omitted — bookings carry no price) */}
        <div className="grid gap-6 sm:grid-cols-3 mb-8">
          {[
            { label: 'Total Bookings', value: stats.total, icon: '📅' },
            { label: 'Upcoming', value: stats.upcoming.length, icon: '⏰' },
            { label: 'Completed', value: stats.completed, icon: '✅' },
          ].map((s) => (
            <Card key={s.label}>
              <CardBody className="text-center space-y-2">
                <div className="text-4xl">{s.icon}</div>
                <div className="h1 text-accent">
                  <CountUp value={String(s.value)} />
                </div>
                <div className="text-sm text-muted">{s.label}</div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming appointments */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h2 className="font-semibold text-fg">Upcoming appointments</h2>
              <Link href="/bookings" className="text-sm text-accent hover:underline">View all</Link>
            </CardHeader>
            <CardBody className="space-y-3">
              {loading ? (
                <SkeletonCard />
              ) : stats.upcoming.length === 0 ? (
                <p className="text-muted">
                  No upcoming appointments. <Link href="/book" className="text-accent hover:underline">Book one</Link>.
                </p>
              ) : (
                stats.upcoming.slice(0, 4).map((b) => (
                  <div key={b.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="font-medium text-fg">Booking {b.id.slice(0, 8)}</p>
                      <p className="text-sm text-muted">{fmtDate(b.scheduled_start ?? b.scheduled_at)}</p>
                    </div>
                    <Badge variant={statusBadgeVariant(b.status)}>{statusLabel(b.status)}</Badge>
                  </div>
                ))
              )}
            </CardBody>
          </Card>

          {/* Quick actions + browse */}
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-fg">Quick actions</h2>
            </CardHeader>
            <CardBody className="space-y-3">
              <Link href="/book" className="block rounded-lg bg-accent/10 p-4 font-semibold text-accent hover:bg-accent/20">
                📅 Book New Appointment
              </Link>
              <Link href="/technicians" className="block rounded-lg bg-accent/10 p-4 font-semibold text-accent hover:bg-accent/20">
                🔍 Browse Professionals
              </Link>
              {categories.length > 0 && (
                <div className="pt-2">
                  <p className="mb-2 text-sm font-medium text-muted">Popular services</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.flatMap((c) => c.services).slice(0, 6).map((s) => (
                      <Link key={s.id} href="/book" className="rounded-full border border-border px-3 py-1 text-sm text-fg hover:border-accent hover:text-accent">
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
