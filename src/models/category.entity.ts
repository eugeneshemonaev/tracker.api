import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryTypes } from '../common/enums/category-types.enum';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CategoryTypes,
    nullable: true
  })
  type: CategoryTypes;

  @ManyToOne(() => Category, category => category.parent, {})
  @JoinColumn({ name: "parent_id" })
  parent: Category;
}
