import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/Order.entity';
import { AppDataSource } from '../../../infra/appDataSource';
import { Order } from '../../domain/Order';

export class OrderRepo {
  private repo: Repository<OrderEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(OrderEntity);
  }

  async save(order: Order) {
    const orderData = new OrderEntity();
    orderData.id = order.id;
    orderData.asset = order.asset;
    orderData.price = order.price;
    orderData.quantity = order.quantity;
    orderData.type = order.type;
    orderData.userId = order.userId;
    orderData.status = order.getStatus();

    return await this.repo.save(orderData);
  }
  async updateOrderStatus(orderId: string, status: 'FILLED' | 'CANCELLED') {
    return await this.repo.update({ id: orderId }, { status });
  }
}
