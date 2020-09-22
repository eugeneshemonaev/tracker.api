import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Store } from './store.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

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
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  price: number;

  @ManyToOne(() => Product, product => product.id)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => Store, shop => shop.id)
  @JoinColumn({ name: "shop_id" })
  shop: Store;
}
