import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('brands')
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    @CreateDateColumn({ type: 'timestamp with time zone' })
    created: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updated: Date;

    @Column({
        length: 50,
    })
    name: string;
}
