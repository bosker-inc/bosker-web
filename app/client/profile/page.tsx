'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileInput } from '@/lib/validation';
import { getUserProfile, updateUserProfile } from '@/lib/customer-api';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/Avatar';
import { SkeletonCard } from '@/components/Skeleton';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phoneNumber: '' },
  });

  useEffect(() => {
    getUserProfile()
      .then((p) => {
        form.reset({
          firstName: p.firstName ?? '',
          lastName: p.lastName ?? '',
          email: p.email ?? '',
          phoneNumber: p.phoneNumber ?? '',
        });
        setAvatar(p.avatar);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load profile'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: ProfileInput) => {
    setSaved(false);
    setError(null);
    try {
      await updateUserProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email || undefined,
        phoneNumber: data.phoneNumber || undefined,
      });
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save profile');
    }
  };

  const name = `${form.watch('firstName')} ${form.watch('lastName')}`.trim();

  return (
    <main className="p-8 bg-bg min-h-screen">
      <div className="max-w-2xl">
        <h1 className="h1 text-fg mb-6">Profile</h1>

        {loading ? (
          <SkeletonCard />
        ) : (
          <Card>
            <CardHeader className="flex items-center gap-4">
              <Avatar src={avatar ?? undefined} initials={name || 'You'} size="lg" />
              <div>
                <p className="font-semibold text-fg">{name || 'Your name'}</p>
                <p className="text-sm text-muted">{form.watch('email') || 'No email'}</p>
              </div>
            </CardHeader>
            <CardBody>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="First Name" fullWidth {...form.register('firstName')} error={form.formState.errors.firstName?.message} />
                  <Input label="Last Name" fullWidth {...form.register('lastName')} error={form.formState.errors.lastName?.message} />
                  <Input label="Email" type="email" fullWidth {...form.register('email')} error={form.formState.errors.email?.message} />
                  <Input label="Phone" fullWidth {...form.register('phoneNumber')} error={form.formState.errors.phoneNumber?.message} />
                </div>

                {error && <p className="text-sm text-danger">{error}</p>}
                {saved && <p className="text-sm text-success">Profile saved ✓</p>}

                <div className="flex gap-3">
                  <Button type="submit" isLoading={form.formState.isSubmitting}>Save changes</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}
      </div>
    </main>
  );
}
