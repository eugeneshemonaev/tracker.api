import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DiscountTypes } from '../common/enums/discount-types.enum';

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: DiscountTypes
  })
  type: DiscountTypes;

  @Column({
    type: 'jsonb'
  })
  conditions: Record<string, unknown>;

  @Column()
  amount: number;

  @Column({
    type: 'timestamptz'
  })
  valid_till: Date;
}
