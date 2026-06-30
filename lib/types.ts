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
