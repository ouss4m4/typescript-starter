import { DataSource } from 'typeorm';
import { OrderEventEntity } from '../Order/infra/entities/OrderEvent.entity';
import { OrderEntity } from '../Order/infra/entities/Order.entity';
import { OrderReadEntity } from '../Order/infra/entities/OrderRead.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'tabadulat',
  synchronize: true,
  logging: false,
  entities: [OrderEventEntity, OrderEntity, OrderReadEntity],
});

export const connectDb = () => AppDataSource.initialize().then((d) => console.log('DB Connected'));
