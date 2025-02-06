import express, { json } from 'express';
import { createOrder } from '../Order/application/Order.controller';

const app = express();

app.use(json());

app.post('/orders', createOrder);


const port = process.env.PORT ?? 3001;

export const startServer = () => {
  app.listen(port, async () => {
    console.log(`Server up and running on port: ${port}`);
  });
};
