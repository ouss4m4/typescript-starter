import { DomainEvent } from '../../shared/events/DomainEvent';
import { OrderType } from '../domain/OrderTypes';

export class OrderCreatedEvent implements DomainEvent {
  eventName = 'OrderCreated';
  occurredAt: Date;

  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly asset: string,
    public readonly quantity: number,
    public readonly price: number,
    public readonly type: OrderType,
  ) {
    this.occurredAt = new Date();
  }
}
