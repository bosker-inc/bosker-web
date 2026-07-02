import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardBody } from '@/components/Card';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Bosker account',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50 py-12">
      <div className="container max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-primary-600 mb-4 inline-block">
            Bosker
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900">Welcome Back</h1>
          <p className="text-neutral-600 mt-2">Sign in to your account</p>
        </div>

        <Card>
          <CardBody className="py-8">
            <LoginForm />
          </CardBody>
        </Card>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <p>Customer: demo@example.com → client portal</p>
          <p>Professional: tech@example.com → technician portal</p>
          <p>Password: demo1234 (any password works in demo)</p>
        </div>
      </div>
    </main>
  );
}
