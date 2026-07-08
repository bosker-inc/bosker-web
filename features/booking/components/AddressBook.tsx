'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BffAddress, BffAddressType } from '@/lib/types';
import { createAddress, deleteAddress, getCustomerAddressBook } from '@/lib/address-api';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { LocationMap, MapLocation } from './LocationMap';

// The location the booking flow needs: coordinates + jurisdiction + label.
export interface SelectedLocation {
  addressId?: string;
  fullAddress: string;
  state: string;
  lat: number;
  long: number;
}

interface AddressBookProps {
  value: SelectedLocation | null;
  onChange: (loc: SelectedLocation) => void;
}

const ADDRESS_TYPES: BffAddressType[] = ['HOME', 'OTHER'];

export function AddressBook({ value, onChange }: AddressBookProps) {
  const [addresses, setAddresses] = useState<BffAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);

  // New-address form state.
  const [alias, setAlias] = useState('');
  const [type, setType] = useState<BffAddressType>('HOME');
  const [fullAddress, setFullAddress] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState<MapLocation>({ lat: 40.7128, long: -74.006 });

  const loadAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await getCustomerAddressBook();
      setAddresses(list);
      // Auto-select the default address on first load if nothing chosen yet.
      if (!value) {
        const def = list.find((a) => a.isDefault) ?? list[0];
        if (def) selectAddress(def);
      }
      // Open the add form automatically when the book is empty.
      if (list.length === 0) setAdding(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load your addresses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectAddress = (a: BffAddress) => {
    onChange({
      addressId: a.id,
      fullAddress: a.fullAddress,
      state: '', // state is stored on the address record server-side; kept blank here
      lat: a.lat,
      long: a.long,
    });
  };

  const resetForm = () => {
    setAlias('');
    setType('HOME');
    setFullAddress('');
    setState('');
    setPin({ lat: 40.7128, long: -74.006 });
  };

  const saveAddress = async () => {
    setSaving(true);
    setError(null);
    try {
      const created = await createAddress({
        alias: alias.trim() || 'My address',
        fullAddress: fullAddress.trim(),
        lat: pin.lat,
        long: pin.long,
        type,
        isDefault: addresses.length === 0,
      });
      setAddresses((prev) => [...prev, created]);
      onChange({
        addressId: created.id,
        fullAddress: created.fullAddress,
        state,
        lat: created.lat,
        long: created.long,
      });
      resetForm();
      setAdding(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save the address');
    } finally {
      setSaving(false);
    }
  };

  const removeAddress = async (id: string) => {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      if (value?.addressId === id) {
        onChange({ fullAddress: '', state: '', lat: 0, long: 0 });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not remove the address');
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">{error}</div>
      )}

      {loading ? (
        <p className="text-muted">Loading your addresses…</p>
      ) : (
        <div className="space-y-2">
          {addresses.map((a) => {
            const active = value?.addressId === a.id;
            return (
              <div
                key={a.id}
                className={`flex items-start justify-between gap-3 rounded-lg border p-3 transition-colors ${
                  active ? 'border-accent bg-accent/10' : 'border-border hover:bg-surface-2'
                }`}
              >
                <button
                  type="button"
                  onClick={() => selectAddress(a)}
                  className="flex-1 text-left"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-semibold text-fg">{a.alias}</span>
                    <span className="rounded bg-surface-2 px-1.5 py-0.5 text-xs text-muted">{a.type}</span>
                    {a.isDefault && (
                      <span className="rounded bg-accent/15 px-1.5 py-0.5 text-xs text-accent">Default</span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">{a.fullAddress}</span>
                </button>
                <button
                  type="button"
                  onClick={() => removeAddress(a.id)}
                  className="text-sm text-muted hover:text-danger"
                  aria-label={`Remove ${a.alias}`}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}

      {!adding && (
        <Button variant="ghost" onClick={() => setAdding(true)}>
          + Add a new address
        </Button>
      )}

      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 rounded-lg border border-border p-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Label"
                  placeholder="Home, Office…"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  fullWidth
                />
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-semibold text-fg">Type</label>
                  <div className="flex gap-2">
                    {ADDRESS_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={`flex-1 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                          type === t ? 'border-accent bg-accent/10 text-accent' : 'border-border text-fg'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Input
                label="Full address"
                placeholder="Street, city, postcode"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                fullWidth
              />

              <Input
                label="State / region"
                placeholder="e.g. NY, NSW"
                value={state}
                onChange={(e) => setState(e.target.value)}
                helperText="Used to match a technician licensed in your jurisdiction."
                fullWidth
              />

              <LocationMap
                value={pin}
                onChange={setPin}
                onResolved={(loc) => {
                  setPin({ lat: loc.lat, long: loc.long });
                  if (loc.fullAddress && !fullAddress) setFullAddress(loc.fullAddress);
                  if (loc.state && !state) setState(loc.state);
                }}
              />

              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    resetForm();
                    setAdding(addresses.length === 0);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={saveAddress} isLoading={saving} disabled={!fullAddress.trim()}>
                  Save address
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
