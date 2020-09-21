import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  rating: number;

  @Column()
  ratingCount: number;

  @Column()
  followers: number;
}
