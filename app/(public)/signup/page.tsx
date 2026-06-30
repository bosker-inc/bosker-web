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
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50 py-12">
      <div className="container max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-primary-600 mb-4 inline-block">
            Bosker
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900">Get Started</h1>
          <p className="text-neutral-600 mt-2">Create your account in 2 minutes</p>
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
