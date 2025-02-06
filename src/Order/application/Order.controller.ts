import { Request, Response } from 'express';
import { Order } from '../domain/Order';
import { OrderEventStore } from '../infra/repos/OrderEvent.repo';
import { OrderCreatedEvent } from '../events/OrderCreated.event';
import { sendEventToKafka } from '../infra/kafkaProducer';

const orderEventStore = new OrderEventStore(); // Initialize event store

export const createOrder = async (req: Request, res: Response) => {
  const { userId, asset, quantity, price, type } = req.body;

  try {
    // DTO Validation First
    // joi to validate the req.body
    // Create an order (following business rules)
    const order = Order.create(userId, asset, quantity, price, type);

    // create and save the Event
    const orderCreatedEvent = new OrderCreatedEvent(order.id, userId, asset, quantity, price, type);
    await orderEventStore.save(orderCreatedEvent, order.id); // Save event to store

    // dispatch event to kafka
    await sendEventToKafka(orderCreatedEvent);

    res.status(201).json({
      message: 'Order created successfully',
      orderId: order.id,
    });
  } catch (error) {
    let message = 'something bad happened';
    if (error instanceof Error) {
      message = error.message;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
};
