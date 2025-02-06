import kafka from '../../shared/kafkaClient'; // Import Kafka client
import { Order } from '../domain/Order';
import { ORDER_CREATED, OrderCreatedEvent } from '../events/OrderCreated.event';
import { OrderRepo } from './repos/Order.repo';
import { OrderReadRepo } from './repos/OrderRead.repo';

const consumer = kafka.consumer({ groupId: 'order-group', heartbeatInterval: 1 });

export const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'order-events', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) {
        return;
      }
      const event: OrderCreatedEvent = JSON.parse(message.value.toString());

      if (event.eventName === ORDER_CREATED) {
        const orderCreatedEvent = new OrderCreatedEvent(
          event.orderId,
          event.userId,
          event.asset,
          event.quantity,
          event.price,
          event.type,
        );

        // Process the event (e.g., save the order in the database)
        console.log('Handling Order Created Event:', orderCreatedEvent);

        // Step 1: Create the order in the domain
        const order = Order.create(
          orderCreatedEvent.userId,
          orderCreatedEvent.asset,
          orderCreatedEvent.quantity,
          orderCreatedEvent.price,
          orderCreatedEvent.type,
        );

        // Step 2: Persist the order in the database (Write Model)
        const orderRepository = new OrderRepo();
        try {
          const orderEntity = await orderRepository.save(order); // Save to the database
          console.log('Order successfully saved to the database:', orderEntity);

          const orderRead = new OrderReadRepo();
          await orderRead.saveOrderRead({ ...orderEntity, createdAt: new Date() });
        } catch (error) {}
      }
    },
  });
};
