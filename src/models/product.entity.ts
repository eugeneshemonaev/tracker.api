import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { Brand } from './brand.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => Category, category => category.id)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ManyToOne(() => Brand, brand => brand.id)
  @JoinColumn({ name: "brand_id" })
  brand: Brand;
}
