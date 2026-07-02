import { ReactNode } from 'react';

export default function TechnicianLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-200 bg-neutral-50 min-h-screen">
        <nav className="p-6 space-y-2">
          <NavLink href="/dashboard" label="Dashboard" icon="📊" />
          <NavLink href="/bookings" label="Bookings" icon="📅" />
          <NavLink href="/availability" label="Availability" icon="🗓️" />
          <NavLink href="/profile" label="My Profile" icon="👤" />
          <hr className="my-4 border-neutral-200" />
          <NavLink href="/logout" label="Logout" icon="🚪" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}

function NavLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-200 transition-colors text-neutral-700 hover:text-neutral-900"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </a>
  );
}
