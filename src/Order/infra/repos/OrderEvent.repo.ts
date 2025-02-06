import { Repository } from 'typeorm';
import { OrderEventEntity } from '../entities/OrderEvent.entity';
import { AppDataSource } from '../../../infra/appDataSource';
import { DomainEvent } from '../../../shared/events/DomainEvent';

export class OrderEventStore {
  private repository: Repository<OrderEventEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(OrderEventEntity); // Assumes you have a data source setup
  }

  async save(event: DomainEvent, orderId: string): Promise<void> {
    const orderEvent = new OrderEventEntity();
    orderEvent.orderId = orderId;
    orderEvent.eventName = event.eventName;
    orderEvent.payload = { ...event }; // Store the entire event payload
    orderEvent.occurredAt = event.occurredAt;

    await this.repository.save(orderEvent); // Save the event to PostgreSQL
  }
}
