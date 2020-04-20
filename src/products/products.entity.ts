import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { ProductGroup } from '../product-groups/product-groups.entity';
import { Exclude } from 'class-transformer';
import { Brand } from '../brands/brands.entity';

@Entity('products')
export class Product {
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

    @Column()
    productGroupId: number;

    @Exclude()
    @ManyToOne(
        () => ProductGroup)
    @JoinColumn({ name: 'productGroupId' })
    productGroup: ProductGroup;

    @Column()
    brandId: number;

    @Exclude()
    @ManyToOne(
        () => Brand)
    @JoinColumn({ name: 'brandId' })
    brand: Brand;
}
