import { connectDb } from './infra/appDataSource';
import { startServer } from './infra/server';
import { startConsumer } from './Order/infra/kafkaConsumer';

startServer();
connectDb();

// todo: this should be a central function in /Order to register order related consumer

// Start the Kafka consumer
startConsumer().then(() => {
  console.log('Kafka consumer is listening for events...');
});
