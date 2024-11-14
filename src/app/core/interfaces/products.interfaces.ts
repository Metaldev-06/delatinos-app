export interface Products {
  data:       ProductData[];
  pagination: Pagination;
}

export interface ProductData {
  id:            string;
  name:          string;
  slug:          string;
  price:         number;
  description:   string;
  information:   null | string;
  stock:         number;
  createdAt:     Date;
  updatedAt:     Date;
  images:        Image[];
  brandId:       ID;
  categoryId:    ID;
  subCategoryId: ID;
  countryId:     Country;
}

export interface ID {
  id:        number;
  name:      string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Country {
  id: number;
  name:      string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  id:       string;
  imageUrl: string;
}

export interface Pagination {
  total:   number;
  pages:   number;
  current: number;
  limit:   number;
  offset:  number;
}
