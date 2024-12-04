export interface CategoriesResponse {
  data: CategoriesData[];
  pagination: Pagination;
}

export interface CategoriesData {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  subCategories?: SubCategoriesData[];
}

export interface SubCategoriesData {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Pagination {
  total: number;
  pages: number;
  current: number;
  limit: number;
  offset: number;
}
