import { OrderType } from '../../domain/OrderTypes';

export class CreateOrderCommand {
  constructor(
    public userId: string,
    public asset: string,
    public quantity: number,
    public price: number,
    public type: OrderType,
  ) {}
}
