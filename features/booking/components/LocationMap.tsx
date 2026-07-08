'use client';

import { useEffect, useRef, useState } from 'react';
import { GOOGLE_MAPS_KEY, loadGoogleMaps, reverseGeocode } from '@/lib/google-maps';
import { Input } from '@/components/Input';

export interface MapLocation {
  lat: number;
  long: number;
  fullAddress?: string;
  state?: string;
}

interface LocationMapProps {
  value: MapLocation;
  onChange: (loc: MapLocation) => void;
  // Called when the pin resolves to a richer address (reverse geocode).
  onResolved?: (loc: Required<Pick<MapLocation, 'fullAddress' | 'state'>> & MapLocation) => void;
}

const DEFAULT_CENTER = { lat: 40.7128, long: -74.006 };

// A draggable-pin location picker. Uses Google Maps when a key is configured,
// otherwise degrades to manual latitude/longitude entry so the flow still works.
export function LocationMap({ value, onChange, onResolved }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<{ setPosition: (p: { lat: number; lng: number }) => void } | null>(null);
  const [mapsFailed, setMapsFailed] = useState(false);

  const lat = value.lat || DEFAULT_CENTER.lat;
  const long = value.long || DEFAULT_CENTER.long;

  // Keep the latest onChange/onResolved without re-initialising the map.
  const changeRef = useRef(onChange);
  const resolvedRef = useRef(onResolved);
  changeRef.current = onChange;
  resolvedRef.current = onResolved;

  const commit = async (nextLat: number, nextLong: number) => {
    changeRef.current({ lat: nextLat, long: nextLong });
    try {
      const geo = await reverseGeocode(nextLat, nextLong);
      if (geo) {
        resolvedRef.current?.({ lat: nextLat, long: nextLong, ...geo });
      }
    } catch {
      // Reverse geocoding is best-effort; ignore failures.
    }
  };

  useEffect(() => {
    if (!GOOGLE_MAPS_KEY) return;
    let cancelled = false;

    loadGoogleMaps()
      .then((g) => {
        if (!g || cancelled || !mapRef.current) {
          if (!g) setMapsFailed(true);
          return;
        }
        const center = { lat, lng: long };
        const map = new g.maps.Map(mapRef.current, {
          center,
          zoom: 13,
          disableDefaultUI: true,
          zoomControl: true,
        });
        const marker = new g.maps.Marker({ position: center, map, draggable: true });
        markerRef.current = marker;

        // Drag the pin, or click the map, to reposition.
        marker.addListener('dragend', () => {
          const pos = marker.getPosition();
          if (pos) void commit(pos.lat(), pos.lng());
        });
        map.addListener('click', (e) => {
          if (!e.latLng) return;
          const nextLat = e.latLng.lat();
          const nextLng = e.latLng.lng();
          marker.setPosition({ lat: nextLat, lng: nextLng });
          void commit(nextLat, nextLng);
        });
      })
      .catch(() => {
        if (!cancelled) setMapsFailed(true);
      });

    return () => {
      cancelled = true;
    };
    // Initialise once; pin updates flow through markerRef below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the marker in sync when the location is changed elsewhere (e.g. picking
  // a saved address).
  useEffect(() => {
    markerRef.current?.setPosition({ lat, lng: long });
  }, [lat, long]);

  const showMap = Boolean(GOOGLE_MAPS_KEY) && !mapsFailed;

  return (
    <div className="space-y-3">
      {showMap ? (
        <>
          <div
            ref={mapRef}
            role="application"
            aria-label="Map — drag the pin or tap to set the job location"
            className="h-64 w-full overflow-hidden rounded-lg border border-border bg-surface-2"
          />
          <p className="text-xs text-muted">Drag the pin or tap the map to set the exact job location.</p>
        </>
      ) : (
        <p className="text-xs text-muted">
          {GOOGLE_MAPS_KEY
            ? 'Map could not load — enter coordinates manually.'
            : 'Map preview unavailable — enter coordinates manually.'}
        </p>
      )}

      {/* Coordinates stay editable as a fallback and for fine-tuning. */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Latitude"
          type="number"
          value={String(value.lat ?? '')}
          onChange={(e) => onChange({ ...value, lat: Number(e.target.value) })}
          fullWidth
        />
        <Input
          label="Longitude"
          type="number"
          value={String(value.long ?? '')}
          onChange={(e) => onChange({ ...value, long: Number(e.target.value) })}
          fullWidth
        />
      </div>
    </div>
  );
}
