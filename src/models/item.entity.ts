import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Store } from './store.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  productId: number;

  @Column()
  skuId: number;

  @Column()
  props: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  rating: number;

  @Column()
  reviews: number;

  @Column()
  orders: number;

  @Column({
    type: 'jsonb'
  })
  images: Array<string>;

  @Column({
    type: 'jsonb'
  })
  smallImages: Array<string>;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  price: number;

  @Column()
  currency: string;

  @ManyToOne(
    () => Product,
    product => product.id,
    { nullable: true })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => Store, store => store.id)
  @JoinColumn({ name: "store_id" })
  store: Store;
}
