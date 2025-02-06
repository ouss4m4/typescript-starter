import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders_read') // Read Model Table
export class OrderReadEntity {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @Column({ type: 'varchar', length: '36' })
  userId: string;

  @Column({ type: 'varchar', length: '36' })
  asset: string;

  @Column('decimal')
  quantity: number;

  @Column('decimal')
  price: number;

  @Column({ type: 'varchar', length: 4 })
  type: string;

  @Column({ type: 'varchar', default: 'PENDING' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
