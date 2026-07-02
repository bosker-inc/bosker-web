'use client';

import { Card, CardBody } from '@/components/Card';
import { Button } from '@/components/Button';

export default function TechnicianError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 p-8 bg-neutral-50">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardBody className="text-center space-y-6 py-12">
            <div className="text-6xl">⚠️</div>

            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Error loading page
              </h1>
              <p className="text-neutral-600">
                Something went wrong. Please try again.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button onClick={() => reset()} size="lg">
                Try again
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = '/dashboard')}
              >
                Back to dashboard
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
