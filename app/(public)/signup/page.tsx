import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardBody } from '@/components/Card';
import { SignupForm } from '@/features/auth/components/SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new Bosker account',
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-surface-2 bg-mesh py-12">
      <div className="container max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="h1 text-accent mb-4 inline-block">
            Bosker
          </Link>
          <h1 className="h1 text-fg">Get Started</h1>
          <p className="text-muted mt-2">Create your account in 2 minutes</p>
        </div>

        <Card>
          <CardBody className="py-8">
            <SignupForm />
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
