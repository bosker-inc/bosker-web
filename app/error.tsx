'use client';

import { useEffect } from 'react';
import { Card, CardBody } from '@/components/Card';
import { Button } from '@/components/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-neutral-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardBody className="text-center space-y-6 py-12">
          <div className="text-6xl">⚠️</div>

          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-neutral-600">
              We encountered an unexpected error. Please try again.
            </p>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
              <p className="text-xs text-red-600 font-mono break-words">
                {error.message}
              </p>
            </div>
          )}

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
              Back to home
            </Button>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
