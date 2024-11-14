export interface CountriesResponse {
  data:       CountriesData[];
  pagination: Pagination;
}

export interface CountriesData {
  id:        number;
  name:      string;
  image:     string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Pagination {
  total:   number;
  pages:   number;
  current: number;
  limit:   number;
  offset:  number;
}
