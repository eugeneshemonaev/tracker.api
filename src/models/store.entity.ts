import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({
    name: 'company_id'
  })
  companyId: number;

  @Column({
    name: 'store_id'
  })
  storeId: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  rating: number;

  @Column({
    name: 'rating_count'
  })
  ratingCount: number;

  @Column({
    name: 'top_rated'
  })
  topRated: boolean;

  @Column()
  followers: number;

  @Column({
    type: 'date',
    name: 'opening_date'
  })
  openingDate: Date;

  @Column({
    name: 'opened_years'
  })
  openedYears: number;
}
