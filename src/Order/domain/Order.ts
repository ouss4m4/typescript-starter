import { randomUUID } from 'crypto';
import { OrderStatus, OrderType } from './OrderTypes';
import { OrderCreatedEvent } from '../events/OrderCreated.event';

export class Order {
  private events: OrderCreatedEvent[] = [];
  private status: OrderStatus;

  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly asset: string,
    public readonly quantity: number,
    public readonly price: number,
    public readonly type: OrderType,
  ) {
    this.status = OrderStatus.PENDING;
  }

  // Factory method to create a new order
  static create(userId: string, asset: string, quantity: number, price: number, type: OrderType): Order {
    const order = new Order(randomUUID(), userId, asset, quantity, price, type);
    // Raise an event that an order has been created
    order.addEvent(new OrderCreatedEvent(order.id, userId, asset, quantity, price, type));
    return order;
  }

  // Method to add events to the order
  private addEvent(event: OrderCreatedEvent) {
    this.events.push(event);
  }

  // Getter for events
  getEvents(): OrderCreatedEvent[] {
    return this.events;
  }
}
