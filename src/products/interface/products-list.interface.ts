export interface ProductsListInterface {
    products: Array<{
        id: number;
        name: string;
        productGroupId: number;
        brandId: number;
    }>;
    meta: {
        limit: number;
        offset: number;
        total: number;
    }
}
