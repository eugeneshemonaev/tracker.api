export interface BrandsListInterface {
    brands: Array<{
        id: number;
        name: string;
    }>;
    meta: {
        limit: number;
        offset: number;
        total: number;
    }
}
