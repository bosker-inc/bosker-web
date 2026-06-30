import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupInput = z.infer<typeof signupSchema>;

// Search schemas
export const searchFiltersSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  minRating: z.number().min(0).max(5).optional(),
  maxPrice: z.number().min(0).optional(),
  minPrice: z.number().min(0).optional(),
  city: z.string().optional(),
  sortBy: z.enum(['rating', 'price', 'recent']).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

export type SearchFiltersInput = z.infer<typeof searchFiltersSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// Booking schema
export const bookingSchema = z.object({
  technicianId: z.string().min(1, 'Please select a technician'),
  serviceId: z.string().min(1, 'Please select a service'),
  scheduledAt: z.date().min(new Date(), 'Please select a future date'),
  notes: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
