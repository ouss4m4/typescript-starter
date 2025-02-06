import { DataSource } from 'typeorm';
import { OrderEvent } from '../Order/infra/OrderEvent.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'tabadulat',
  synchronize: true,
  logging: true,
  entities: [OrderEvent],
});

export const connectDb = () => AppDataSource.initialize().then((d) => console.log('DB Connected'));
