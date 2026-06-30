import Link from 'next/link';
import { Metadata } from 'next';
import { Card, CardBody } from '@/components/Card';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardBody className="text-center space-y-6 py-12">
          <div className="text-8xl font-bold text-primary-600">404</div>

          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Page Not Found
            </h1>
            <p className="text-neutral-600">
              The page you are looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Link href="/">
              <Button size="lg" fullWidth>
                Back to home
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" fullWidth>
                Browse services
              </Button>
            </Link>
          </div>

          <div className="text-6xl">🔍</div>
        </CardBody>
      </Card>
    </main>
  );
}
