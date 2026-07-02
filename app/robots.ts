import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Trailing slashes: robots.txt prefix-matches, and bare
        // "/technician" would also block the public "/technicians" page.
        disallow: ['/admin/', '/client/', '/technician/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: 'https://bosker.app/sitemap.xml',
    host: 'https://bosker.app',
  };
}
