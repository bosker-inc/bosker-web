'use client';

import { useState } from 'react';
import { Card, CardBody } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';

export interface BookingRequest {
  id: string;
  customerName: string;
  customerAvatar: string;
  service: string;
  date: string;
  price: string;
}

interface BookingRequestCardProps {
  request: BookingRequest;
}

export function BookingRequestCard({ request }: BookingRequestCardProps) {
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>(
    'pending'
  );

  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{request.customerAvatar}</div>
            <div>
              <h3 className="font-semibold text-fg">
                {request.customerName}
              </h3>
              <p className="text-sm text-muted">{request.service}</p>
              <p className="text-sm text-muted mt-1">
                {request.date} • {request.price}
              </p>
            </div>
          </div>

          {status === 'pending' ? (
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setStatus('accepted')}>
                Accept
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setStatus('declined')}
              >
                Decline
              </Button>
            </div>
          ) : (
            <Badge variant={status === 'accepted' ? 'success' : 'neutral'}>
              {status === 'accepted' ? 'Accepted' : 'Declined'}
            </Badge>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
