export interface ProductsParams {
  filter?: Filter;
  offset?: number;
  limit?: number;
  country?: string;
  term?: string;
}

export interface Filter {
  name: string;
  value: string;
  direction: string;
}
