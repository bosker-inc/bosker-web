'use client';

import { useMemo, useState } from 'react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { Modal } from '@/components/Modal';
import { cn } from '@/lib/utils';
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  type PortfolioItem,
} from '@/features/portfolio/data';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';

type Filter = 'All' | (typeof PORTFOLIO_CATEGORIES)[number];

export function PortfolioGallery() {
  const [filter, setFilter] = useState<Filter>('All');
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const filters: Filter[] = ['All', ...PORTFOLIO_CATEGORIES];
  const items = useMemo(
    () =>
      filter === 'All'
        ? PORTFOLIO_ITEMS
        : PORTFOLIO_ITEMS.filter((i) => i.category === filter),
    [filter]
  );

  return (
    <>
      {/* Filter pills */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-ring',
              filter === f
                ? 'bg-accent text-accent-fg'
                : 'bg-surface-2 text-muted hover:text-fg'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid — `filter` in the key restarts the stagger on filter change */}
      <StaggerGroup
        key={filter}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <StaggerItem key={item.id}>
            <PortfolioCard item={item} onOpen={() => setActive(item)} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Lightbox */}
      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        label={active ? `${active.service} by ${active.technician}` : undefined}
        className="max-w-4xl"
      >
        {active && <Lightbox item={active} />}
      </Modal>
    </>
  );
}

function PortfolioCard({
  item,
  onOpen,
}: {
  item: PortfolioItem;
  onOpen: () => void;
}) {
  const [showBefore, setShowBefore] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${item.service} by ${item.technician}`}
        className="relative block aspect-square w-full focus-ring"
      >
        <OptimizedImage
          src={showBefore ? item.before : item.after}
          alt={`${item.service} — ${showBefore ? 'before' : 'after'}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* State label */}
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {showBefore ? 'Before' : 'After'}
        </span>
      </button>

      {/* Compare toggle — always rendered (tappable on touch), emphasized on hover */}
      <button
        type="button"
        onClick={() => setShowBefore((v) => !v)}
        aria-pressed={showBefore}
        aria-label={showBefore ? 'Show after' : 'Show before'}
        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface/85 text-fg shadow-soft backdrop-blur transition-opacity hover:bg-surface focus-ring md:opacity-0 md:group-hover:opacity-100"
      >
        <span aria-hidden>{showBefore ? '↩️' : '🔍'}</span>
      </button>

      {/* Caption */}
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-fg">{item.service}</p>
          <p className="text-xs text-muted">by {item.technician}</p>
        </div>
        <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
          {item.category}
        </span>
      </div>
    </div>
  );
}

function Lightbox({ item }: { item: PortfolioItem }) {
  const [showBefore, setShowBefore] = useState(false);

  return (
    <div>
      <div className="relative aspect-[4/3] w-full bg-surface-2">
        <OptimizedImage
          src={showBefore ? item.before : item.after}
          alt={`${item.service} — ${showBefore ? 'before' : 'after'}`}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-contain"
        />
        <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {showBefore ? 'Before' : 'After'}
        </span>
      </div>

      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="h3 text-fg">{item.service}</h3>
          <p className="text-sm text-muted">
            by {item.technician} · {item.category}
          </p>
        </div>
        <div className="inline-flex rounded-lg border border-border p-1">
          <button
            onClick={() => setShowBefore(false)}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-semibold transition-colors',
              !showBefore ? 'bg-accent text-accent-fg' : 'text-muted hover:text-fg'
            )}
          >
            After
          </button>
          <button
            onClick={() => setShowBefore(true)}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-semibold transition-colors',
              showBefore ? 'bg-accent text-accent-fg' : 'text-muted hover:text-fg'
            )}
          >
            Before
          </button>
        </div>
      </div>
    </div>
  );
}
