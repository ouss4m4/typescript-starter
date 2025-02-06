import kafka from '../../shared/kafkaClient'; // Import Kafka client
import { OrderCreatedEvent } from '../events/OrderCreated.event';

const producer = kafka.producer();

export const sendEventToKafka = async (event: OrderCreatedEvent) => {
  await producer.connect();

  await producer.send({
    topic: 'order-events',
    messages: [
      {
        value: JSON.stringify(event),
      },
    ],
  });

  await producer.disconnect();
};
