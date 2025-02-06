import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order_event')
export class OrderEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 36 })
  orderId: string;

  @Column({ type: 'varchar', length: 255 })
  eventName: string;

  @Column({ type: 'jsonb' })
  payload: object;

  @Column({ type: 'timestamp' })
  occurredAt: Date;
}
