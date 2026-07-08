// User & Authentication
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'customer' | 'technician' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

// Technician
export interface Technician {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  certifications: string[];
  services: Service[];
  availability?: boolean;
  priceRange: {
    min: number;
    max: number;
  };
  location?: {
    city: string;
    state: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Service
export interface Service {
  id: string;
  name: string;
  description?: string;
  category: string;
  price?: number;
  duration?: number;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

// Booking
export interface Booking {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  scheduledAt: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// The BFF booking status enum (matches bosker-bff BookingStatus). Used by the
// real booking flow; the legacy `Booking` above backs the mock UI pages.
export type BffBookingStatus =
  | 'INITIATED'
  | 'CHOOSE_SERVICE'
  | 'CHOOSE_LOCATION'
  | 'CHOOSE_TIME'
  | 'SUMMARY'
  | 'PAYMENTS'
  | 'FIND_TECHNICIAN'
  | 'SELECT_TECHNICIAN'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CUSTOMER_ABORTED'
  | 'TECHNICIAN_ABORTED'
  | 'NO_TECHNICIAN_FOUND';

// Notification as returned by the BFF (AdminNotification). Read state is per-user:
// a notification is read iff read_by includes the viewer's id.
export interface AppNotification {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'success' | 'warning' | 'error';
  receiver_type: string;
  receiver_ids: string[];
  read_by: string[];
  sent_date: string;
  created_at: string | null;
}

// Shape of BookingItem returned by the BFF (snake_case, mirrors the GraphQL type).
export interface BffBooking {
  id: string;
  customer_id: string;
  status: BffBookingStatus;
  service_id: string | null;
  technician_id: string | null;
  scheduled_at: string | null;
  state: string | null;
  location_lat: number | null;
  location_long: number | null;
  scheduled_start: string | null;
  scheduled_end: string | null;
  created_at: string;
  updated_at: string;
}

// Address book entry as returned by the BFF (getCustomerAddressBook).
export type BffAddressType = 'HOME' | 'OTHER';

export interface BffAddress {
  id: string;
  userId: string;
  alias: string;
  fullAddress: string;
  lat: number;
  long: number;
  type: BffAddressType;
  isDefault: boolean;
}

// Review
export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  technicianId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

// Search & Filter
export interface SearchFilters {
  query?: string;
  category?: string;
  minRating?: number;
  maxPrice?: number;
  minPrice?: number;
  city?: string;
  sortBy?: 'rating' | 'price' | 'recent';
  page?: number;
  limit?: number;
}

export interface SearchResults<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
