import { DomainEvent } from '../../shared/events/DomainEvent';

// src/Order/events/OrderUpdated.event.ts
export const ORDER_UPDATED = 'OrderUpdatedEvent';

export class OrderUpdatedEvent implements DomainEvent {
  eventName = ORDER_UPDATED;
  occurredAt: Date;

  constructor(
    public readonly orderId: string,
    public readonly status: 'FILLED' | 'CANCELLED',
  ) {}
}
