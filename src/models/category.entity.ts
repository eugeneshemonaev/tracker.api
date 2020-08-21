import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryTypes } from '../common/enums/category-types.enum';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CategoryTypes
  })
  type: CategoryTypes;

  @ManyToOne(() => Category, category => category.parent, {})
  @JoinColumn({ name: "parent_id" })
  parent: Category;

}
