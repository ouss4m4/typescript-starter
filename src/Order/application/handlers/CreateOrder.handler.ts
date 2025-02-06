// src/Order/application/handlers/CreateOrderHandler.ts
import { CreateOrderCommand } from '../commands/CreateOrder.command';
import { Order } from '../../domain/Order';
import { OrderEventStore } from '../../infra/repos/OrderEvent.repo';
import { OrderCreatedEvent } from '../../events/OrderCreated.event';
import { sendEventToKafka } from '../../infra/kafkaProducer';

export class CreateOrderHandler {
  private orderEventStore = new OrderEventStore();

  async handle(command: CreateOrderCommand) {
    // Step 1: Create an Order in the Domain layer
    const order = Order.create(command.userId, command.asset, command.quantity, command.price, command.type);

    // Step 2: Create the Event
    const orderCreatedEvent = new OrderCreatedEvent(
      order.id,
      command.userId,
      command.asset,
      command.quantity,
      command.price,
      command.type,
    );

    // Step 3: Persist Event to Event Store
    await this.orderEventStore.save(orderCreatedEvent, order.id);

    // Step 4: Send the Event to Kafka (or any other consumer)
    await sendEventToKafka(orderCreatedEvent);

    return order;
  }
}
