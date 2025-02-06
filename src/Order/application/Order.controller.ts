import { Request, Response } from 'express';
import { Order } from '../domain/Order';
import { OrderEventStore } from '../infra/OrderEvent.repo';
import { OrderCreatedEvent } from '../events/OrderCreated.event';

const orderEventStore = new OrderEventStore(); // Initialize event store

export const createOrder = async (req: Request, res: Response) => {
  const { userId, asset, quantity, price, type } = req.body;

  try {
    // Step 1: Create an Order
    const order = Order.create(userId, asset, quantity, price, type);

    // Step 2: Save the event
    const orderCreatedEvent = new OrderCreatedEvent(order.id, userId, asset, quantity, price, type);

    await orderEventStore.save(orderCreatedEvent, order.id); // Save event to store

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
