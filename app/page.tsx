import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Bosker - Your Beauty Services Platform',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50">
      <div className="container py-20">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-primary-600">
            Welcome to Bosker
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Discover and book professional beauty services from talented technicians
          </p>
          <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Explore Services
          </button>
        </div>
      </div>
    </main>
  );
}
