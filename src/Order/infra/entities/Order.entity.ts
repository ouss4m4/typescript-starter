import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '36' })
  userId: string;

  @Column({ type: 'varchar', length: '36' })
  asset: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 4 })
  type: string;

  @Column({ type: 'varchar', default: 'PENDING' })
  status: string;
}
