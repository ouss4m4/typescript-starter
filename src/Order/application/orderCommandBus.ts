// src/Order/application/commandHandlers.ts
import { CommandBus } from '../../shared/commandBus';
import { CreateOrderCommand } from './commands/CreateOrder.command';
import { CreateOrderHandler } from './handlers/CreateOrder.handler';

export const orderCommandBus = new CommandBus();

// Registering commands and their handlers
orderCommandBus.register(CreateOrderCommand, new CreateOrderHandler());
