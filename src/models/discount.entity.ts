import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DiscountTypes } from '../common/enums/discount-types.enum';
import { Units } from '../common/enums/units.enum';
import { AmountTypes } from '../common/enums/amount-types.enum';

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  discountId: string;

  @Column({
    type: 'enum',
    enum: DiscountTypes,
  })
  type: DiscountTypes;

  @Column({
    nullable: true,
    type: 'decimal',
    scale: 2,
    precision: 10,
  })
  from: number;

  @Column({
    type: 'enum',
    enum: Units,
    nullable: true,
  })
  unit: Units;

  @Column({
    type: 'decimal',
    scale: 2,
    precision: 10,
  })
  amount: number;

  @Column({
    name: 'amount_type',
    type: 'enum',
    enum: AmountTypes,
  })
  amountType: AmountTypes;

  @Column({
    name: 'valid_till',
    type: 'timestamptz',
    nullable: true,
  })
  validTill: Date;
}
