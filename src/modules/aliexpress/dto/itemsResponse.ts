export class ItemsResponse {
  data: {
    items: {
      productId: number;
    }[],
    resultCount: number,
    resultSizePerPage: number;
  }
}
