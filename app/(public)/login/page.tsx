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
    <main className="min-h-screen bg-surface-2 bg-mesh py-12">
      <div className="container max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="h1 text-accent mb-4 inline-block">
            Bosker
          </Link>
          <h1 className="h1 text-fg">Welcome Back</h1>
          <p className="text-muted mt-2">Sign in to your account</p>
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
