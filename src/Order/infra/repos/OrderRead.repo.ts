import { AppDataSource } from '../../../infra/appDataSource';
import { Order } from '../../domain/Order';
import { OrderEntity } from '../entities/Order.entity';
import { OrderReadEntity } from '../entities/OrderRead.entity';

export class OrderReadRepo {
  private readonly repository = AppDataSource.getRepository(OrderReadEntity);

  // Save order in the read model (orders_read table)
  async saveOrderRead(order: OrderEntity) {
    const orderReadEntity = new OrderReadEntity();
    Object.assign(orderReadEntity, order);

    return await this.repository.save(orderReadEntity);
  }

  async updateOrderReadStatus(orderId: string, status: 'FILLED' | 'CANCELLED') {
    return await this.repository.update({ orderId }, { status });
  }

  // Optional: Method to fetch an order from the read model (for query)
  async getOrderById(orderId: string) {
    return await this.repository.findOne({ where: { orderId } });
  }
}
