import kafka from '../../shared/kafkaClient'; // Import Kafka client
import { Order } from '../domain/Order';
import { ORDER_CREATED, OrderCreatedEvent } from '../events/OrderCreated.event';
import { OrderRepo } from './repos/Order.repo';

const consumer = kafka.consumer({ groupId: 'order-group', heartbeatInterval: 1 });

export const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'order-events', fromBeginning: true });

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) {
        return;
      }
      const event = JSON.parse(message.value.toString());

      // Validate quantity (or any other validation checks)
      if (event.quantity <= 0 || !Number.isInteger(event.quantity)) {
        // Send the invalid message to the DLQ
        // await producer.send({
        //   topic: 'order-events-dlq',
        //   messages: [{ value: JSON.stringify(event) }],
        // });

        console.error(`Invalid quantity: ${event.quantity}. Moved to DLQ.`);
        return;
      }

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

        // Step 2: Persist the order in the database (using TypeORM)
        const orderRepository = new OrderRepo();
        try {
          const orderEntity = await orderRepository.save(order); // Save to the database
          console.log('Order successfully saved to the database:', orderEntity);
        } catch (error) {
          console.error('!!!!!!');
          console.error(error);
        }
      }
    },
  });
};
