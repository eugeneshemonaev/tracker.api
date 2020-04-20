import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('product_groups')
export class ProductGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    @CreateDateColumn({ type: 'timestamp with time zone' })
    created: string;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updated: string;

    @Column({
        length: 100,
    })
    name: string;
}
