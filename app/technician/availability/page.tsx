import { Metadata } from 'next';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { ScheduleEditor } from '@/features/technician-dashboard/components/ScheduleEditor';

export const metadata: Metadata = {
  title: 'Availability',
  description: 'Manage your working hours and schedule',
  robots: { index: false, follow: false },
};

export default function AvailabilityPage() {
  return (
    <main className="p-8 bg-bg min-h-screen">
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="h1 text-fg">Availability</h1>
          <p className="text-muted mt-2">
            Set your weekly working hours. Customers can only book within these
            times.
          </p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-fg">
              Weekly Schedule
            </h2>
          </CardHeader>
          <CardBody>
            <ScheduleEditor />
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
