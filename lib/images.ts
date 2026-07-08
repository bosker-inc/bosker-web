/**
 * Centralized image catalog.
 *
 * Uses stable Unsplash photo IDs (images.unsplash.com/photo-<id>) with
 * on-the-fly resizing params. Centralizing here keeps URLs swappable in
 * one place and out of component JSX. next/image optimizes these
 * server-side (remotePatterns already allows any HTTPS host).
 */

const unsplash = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const portrait = (id: string, size = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces&w=${size}&h=${size}&q=80`;

// Hero — salon / beauty lifestyle
export const HERO_IMAGE = unsplash('1560066984-138dadb4c035', 900, 1100);

// About hero — team / workspace
export const ABOUT_HERO = unsplash('1521590832167-7bcbfaa6381f', 1200, 700);

// App promotion — phone / lifestyle
export const APP_PROMO_IMAGE = unsplash('1512941937669-90a1b58e7e9c', 800, 900);

// Contact page hero/workspace image
export const CONTACT_IMAGE = unsplash('1629909613654-28e377c37b09', 1000, 1200);

// Services directory header/hero image
export const SERVICES_HERO = unsplash('1519699047748-de8e457a634e', 1200, 400);

// Service categories (order matches the SERVICES arrays)
export const SERVICE_IMAGES: Record<string, string> = {
  'Hair Styling': unsplash('1560869713-7d0a29430803', 600, 400),
  'Nail Care': unsplash('1604654894610-df63bc536371', 600, 400),
  Makeup: unsplash('1596462502278-27bfdc403348', 600, 400),
  Skincare: unsplash('1570172619644-dfd03ed5d881', 600, 400),
  Waxing: unsplash('1512290923902-8a9f81dc236c', 600, 400),
  Massage: unsplash('1544161515-4ab6ce6db874', 600, 400),
  'Eyebrow Design': unsplash('1583001931096-959e9a1a6223', 600, 400),
  'Lash Extensions': unsplash('1583241800698-9c2e0c8a5d8e', 600, 400),
};

// Fallback service image for any name not in the map above
export const SERVICE_IMAGE_FALLBACK = unsplash('1522337660859-02fbefca4702', 600, 400);

export function getServiceImage(name: string): string {
  return SERVICE_IMAGES[name] ?? SERVICE_IMAGE_FALLBACK;
}

// Technician portraits (indexed to the TECHNICIANS arrays)
export const TECHNICIAN_IMAGES: string[] = [
  portrait('1544005313-94ddf0286df2'), // Sarah Johnson
  portrait('1580489944761-15a19d654956'), // Maria Garcia
  portrait('1494790108377-be9c29b29330'), // Emily Chen
  portrait('1573496359142-b8d87734a5a2'), // Jessica Williams
];

export function getTechnicianImage(index: number): string {
  return TECHNICIAN_IMAGES[index % TECHNICIAN_IMAGES.length];
}

// Testimonial avatars
export const TESTIMONIAL_AVATARS: string[] = [
  portrait('1487412720507-e7ab37603c6f', 200),
  portrait('1534528741775-53994a69daeb', 200),
  portrait('1500648767791-00dcc994a43e', 200),
  portrait('1544725176-7c40e5a71c5e', 200),
];

// Exposed builders so feature modules can compose their own image URLs
// (e.g. portfolio before/after pairs) without hardcoding the CDN shape.
export { unsplash as unsplashImage, portrait as portraitImage };
