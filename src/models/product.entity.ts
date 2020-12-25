import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { Brand } from './brand.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({
    name:'search_text'
  })
  searchText: string;

  @Column({
    type: 'decimal',
    scale: 2,
    precision: 10
  })
  price: number;

  @ManyToOne(() => Category, category => category.id)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ManyToOne(() => Brand, brand => brand.id)
  @JoinColumn({ name: "brand_id" })
  brand: Brand;
}
