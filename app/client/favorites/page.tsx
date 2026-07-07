'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FavoriteTechnician, getFavorites, removeFavorite } from '@/lib/favorites-api';
import { Card, CardBody } from '@/components/Card';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';
import { Rating } from '@/components/Rating';
import { EmptyState } from '@/components/EmptyState';
import { SkeletonCard } from '@/components/Skeleton';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteTechnician[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    getFavorites()
      .then(setFavorites)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load favorites'))
      .finally(() => setLoading(false));
  }, []);

  const remove = async (technicianId: string) => {
    setRemoving(technicianId);
    try {
      await removeFavorite(technicianId);
      setFavorites((prev) => prev.filter((f) => f.technician_id !== technicianId));
    } finally {
      setRemoving(null);
    }
  };

  return (
    <main className="p-8 bg-bg min-h-screen">
      <div className="max-w-3xl">
        <h1 className="h1 text-fg mb-2">Favorites</h1>
        <p className="text-muted mb-6">Technicians you&apos;ve saved</p>

        {error && <div className="mb-4 rounded-lg border border-danger/30 bg-danger/10 p-4 text-danger">{error}</div>}

        {loading ? (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : favorites.length === 0 ? (
          <EmptyState
            icon="❤️"
            title="No favorites yet"
            description="Save technicians you like to find them again quickly."
            action={<Link href="/technicians"><Button>Browse professionals</Button></Link>}
          />
        ) : (
          <StaggerGroup className="space-y-3">
            {favorites.map((f) => (
              <StaggerItem key={f.technician_id}>
                <Card variant="interactive">
                  <CardBody className="flex items-center gap-4">
                    <Avatar src={f.avatar ?? undefined} initials={f.name} size="lg" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-fg">{f.name}</p>
                      <div className="flex items-center gap-2">
                        <Rating rating={f.averageRating} />
                        <span className="text-sm text-muted">({f.totalReviews})</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => remove(f.technician_id)}
                      isLoading={removing === f.technician_id}
                    >
                      Remove
                    </Button>
                  </CardBody>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </main>
  );
}
