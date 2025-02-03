export interface OneProductReponse {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  information: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  brandId: BrandID;
  categoryId: CategoryID;
  subCategoryId: CategoryID;
  countryId: CountryID;
  images: Image[];
}

export interface BrandID {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryID {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CountryID {
  id: number;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  id: string;
  imageUrl: string;
}
