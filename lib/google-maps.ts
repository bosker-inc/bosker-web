import { env } from '@/env';

// Minimal loader + typings for the Google Maps JS API. We avoid pulling in the
// heavy @types/google.maps package and only type the small surface we use, and
// we load the script on demand only when an API key is configured.

export const GOOGLE_MAPS_KEY = env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

export interface ReverseGeocodeResult {
  fullAddress: string;
  // Standardised jurisdiction code (e.g. "NSW", "NY") when resolvable.
  state: string;
}

// --- Narrow structural types for the bits of the Maps API we touch ---
export interface GLatLng {
  lat: number;
  lng: number;
}

interface GMarker {
  setPosition(pos: GLatLng): void;
  addListener(event: string, handler: () => void): void;
  getPosition(): { lat(): number; lng(): number } | null;
}

interface GMap {
  addListener(event: string, handler: (e: { latLng?: { lat(): number; lng(): number } }) => void): void;
  setCenter(pos: GLatLng): void;
  panTo(pos: GLatLng): void;
}

interface GAddressComponent {
  short_name: string;
  long_name: string;
  types: string[];
}

interface GGeocoderResult {
  formatted_address?: string;
  address_components?: GAddressComponent[];
}

export interface GoogleMapsApi {
  maps: {
    Map: new (el: HTMLElement, opts: Record<string, unknown>) => GMap;
    Marker: new (opts: Record<string, unknown>) => GMarker;
    Geocoder: new () => {
      geocode(req: { location: GLatLng }): Promise<{ results: GGeocoderResult[] }>;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleMapsApi;
  }
}

let loaderPromise: Promise<GoogleMapsApi | null> | null = null;

// Loads the Google Maps script once and resolves with the `google` namespace,
// or `null` when no API key is configured / it fails to load.
export function loadGoogleMaps(): Promise<GoogleMapsApi | null> {
  if (!GOOGLE_MAPS_KEY) return Promise.resolve(null);
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.google?.maps) return Promise.resolve(window.google);
  if (loaderPromise) return loaderPromise;

  loaderPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google ?? null);
    script.onerror = () => {
      loaderPromise = null;
      reject(new Error('Failed to load Google Maps'));
    };
    document.head.appendChild(script);
  });

  return loaderPromise;
}

// Resolves a lat/long into a human-readable address + jurisdiction code using
// the Google Geocoder. Returns null when maps is unavailable or nothing matches.
export async function reverseGeocode(
  lat: number,
  long: number
): Promise<ReverseGeocodeResult | null> {
  const g = await loadGoogleMaps();
  if (!g) return null;

  const geocoder = new g.maps.Geocoder();
  const { results } = await geocoder.geocode({ location: { lat, lng: long } });
  const best = results?.[0];
  if (!best) return null;

  const stateComponent = best.address_components?.find((c) =>
    c.types.includes('administrative_area_level_1')
  );

  return {
    fullAddress: best.formatted_address ?? '',
    state: stateComponent?.short_name ?? '',
  };
}
