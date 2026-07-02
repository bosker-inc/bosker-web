/**
 * Subdomain utilities for multi-portal routing.
 *
 * Portals:
 * - bosker.app            → marketing site
 * - client.bosker.app     → customer portal (rewritten to /client/*)
 * - technician.bosker.app → technician portal (rewritten to /technician/*)
 */

export type PortalSubdomain = 'client' | 'technician';

export const PORTAL_SUBDOMAINS: PortalSubdomain[] = ['client', 'technician'];

function getRootDomain(): string {
  return process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
}

/**
 * Extract the portal subdomain from a request host.
 * Returns null for the root domain or unknown subdomains.
 *
 * Works for production (client.bosker.app) and local dev
 * (client.localhost:3000 — browsers resolve *.localhost natively).
 */
export function getSubdomain(host: string): PortalSubdomain | null {
  const rootDomain = getRootDomain();

  if (host === rootDomain || host === `www.${rootDomain}`) {
    return null;
  }

  if (host.endsWith(`.${rootDomain}`)) {
    const subdomain = host.slice(0, -(rootDomain.length + 1));
    if ((PORTAL_SUBDOMAINS as string[]).includes(subdomain)) {
      return subdomain as PortalSubdomain;
    }
  }

  return null;
}

/**
 * Build an absolute URL on a portal subdomain.
 * Uses http for localhost, https otherwise.
 */
export function buildSubdomainUrl(
  subdomain: PortalSubdomain,
  path: string = '/'
): string {
  const rootDomain = getRootDomain();
  const protocol = rootDomain.startsWith('localhost') ? 'http' : 'https';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${protocol}://${subdomain}.${rootDomain}${normalizedPath}`;
}

/**
 * Build an absolute URL on the root (marketing) domain.
 */
export function buildRootUrl(path: string = '/'): string {
  const rootDomain = getRootDomain();
  const protocol = rootDomain.startsWith('localhost') ? 'http' : 'https';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${protocol}://${rootDomain}${normalizedPath}`;
}
