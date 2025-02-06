import { Request, Response } from 'express';
import { OrderEventStore } from '../infra/repos/OrderEvent.repo';
import { createOrderSchema } from './order.dtos';
import { CreateOrderCommand } from './commands/CreateOrder.command';
import { orderCommandBus } from './orderCommandBus';

const orderEventStore = new OrderEventStore(); // Initialize event store

export const createOrder = async (req: Request, res: Response) => {
  try {
    // Validate input DTO
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create command
    const command = new CreateOrderCommand(value.userId, value.asset, value.quantity, value.price, value.type);
    // Dispatch the command via Command Bus
    const order = await orderCommandBus.execute(command);

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
