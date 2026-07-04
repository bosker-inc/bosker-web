'use client';

import { Card, CardBody } from '@/components/Card';
import { Button } from '@/components/Button';

export default function PublicError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-surface-2 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardBody className="text-center space-y-6 py-12">
          <div className="text-6xl">⚠️</div>

          <div>
            <h1 className="h1 text-fg mb-2">
              Something went wrong
            </h1>
            <p className="text-muted">
              We&apos;re having trouble loading this page.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={() => reset()} size="lg" fullWidth>
              Try again
            </Button>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => (window.location.href = '/')}
            >
              Go home
            </Button>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
