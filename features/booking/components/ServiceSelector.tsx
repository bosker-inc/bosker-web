'use client';

import { useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  CategoryWithServices,
  ServiceWithSubServices,
  SubServiceOption,
} from '@/lib/booking-api';

const EASE = [0.22, 1, 0.36, 1] as const;

// The selection a customer builds while drilling down the service tree.
// `serviceId` is the leaf node id stored on the booking (a sub-service id when
// the chosen service has sub-services, otherwise the service id itself).
export interface ServiceSelection {
  categoryId: string;
  serviceId: string;
  serviceName: string;
}

interface ServiceSelectorProps {
  categories: CategoryWithServices[];
  loading: boolean;
  value: ServiceSelection | null;
  onChange: (selection: ServiceSelection) => void;
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
        active ? 'border-accent bg-accent/10 text-accent' : 'border-border text-fg hover:bg-surface-2'
      }`}
    >
      {children}
    </button>
  );
}

export function ServiceSelector({ categories, loading, value, onChange }: ServiceSelectorProps) {
  const reduce = useReducedMotion();

  // Category is implied by the selected leaf; derive the currently open
  // category + service so the drill-down stays in sync when resuming a booking.
  const activeCategory = useMemo<CategoryWithServices | null>(() => {
    if (!value) return null;
    return categories.find((c) => c.id === value.categoryId) ?? null;
  }, [categories, value]);

  const activeService = useMemo<ServiceWithSubServices | null>(() => {
    if (!activeCategory || !value) return null;
    return (
      activeCategory.services.find(
        (s) => s.id === value.serviceId || s.subServices.some((ss) => ss.id === value.serviceId)
      ) ?? null
    );
  }, [activeCategory, value]);

  const selectCategory = (cat: CategoryWithServices) => {
    // Opening a category clears any prior service/sub-service selection.
    onChange({ categoryId: cat.id, serviceId: '', serviceName: '' });
  };

  const selectService = (cat: CategoryWithServices, svc: ServiceWithSubServices) => {
    if (svc.subServices.length > 0) {
      // Wait for a sub-service before committing the leaf id.
      onChange({ categoryId: cat.id, serviceId: '', serviceName: `${svc.name} · ` });
    } else {
      onChange({ categoryId: cat.id, serviceId: svc.id, serviceName: svc.name });
    }
  };

  const selectSubService = (cat: CategoryWithServices, svc: ServiceWithSubServices, sub: SubServiceOption) => {
    onChange({ categoryId: cat.id, serviceId: sub.id, serviceName: `${svc.name} · ${sub.name}` });
  };

  if (loading) return <p className="text-muted">Loading services…</p>;
  if (categories.length === 0) return <p className="text-muted">No services are available right now.</p>;

  return (
    <div className="space-y-5">
      {/* Step 1 — Category */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted">1. Choose a category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Chip key={cat.id} active={activeCategory?.id === cat.id} onClick={() => selectCategory(cat)}>
              {cat.name}
            </Chip>
          ))}
        </div>
      </div>

      {/* Step 2 — Service */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <p className="mb-2 text-sm font-medium text-muted">2. Choose a service</p>
            {activeCategory.services.length === 0 ? (
              <p className="text-sm text-muted">No services in this category.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {activeCategory.services.map((svc) => (
                  <Chip
                    key={svc.id}
                    active={activeService?.id === svc.id}
                    onClick={() => selectService(activeCategory, svc)}
                  >
                    {svc.name}
                  </Chip>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 3 — Sub-service (only when the chosen service has any) */}
      <AnimatePresence mode="wait">
        {activeService && activeService.subServices.length > 0 && (
          <motion.div
            key={activeService.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <p className="mb-2 text-sm font-medium text-muted">3. Choose a sub-service</p>
            <div className="flex flex-wrap gap-2">
              {activeService.subServices.map((sub) => (
                <Chip
                  key={sub.id}
                  active={value?.serviceId === sub.id}
                  onClick={() => selectSubService(activeCategory!, activeService, sub)}
                >
                  {sub.name}
                  {typeof sub.price === 'number' && sub.price > 0 && (
                    <span className="ml-1 text-muted">· ${sub.price}</span>
                  )}
                </Chip>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
