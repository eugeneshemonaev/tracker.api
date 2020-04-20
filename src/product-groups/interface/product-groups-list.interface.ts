export interface ProductGroupsListInterface {
    productGroups: Array<{
        id: number;
        name: string;
    }>;
    meta: {
        limit: number;
        offset: number;
        total: number;
    }
}
