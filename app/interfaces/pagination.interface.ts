export interface Pagination<T = any> {
  data: T[];
  pagination: {
    page: number;
    numOfItemsPerPage: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
