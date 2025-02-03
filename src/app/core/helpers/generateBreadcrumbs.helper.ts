import { Breadcrumb } from '../interfaces/breadcrumbs.interface';
import { OneProductReponse } from '../interfaces/product.interface';

export const GenerateBreadcrumbs = (
  products: OneProductReponse,
): Breadcrumb[] => {
  const categoryName = products.categoryId.name;
  const categorySlug = products.categoryId.slug;
  const productName = products.name;
  const productSlug = products.slug;
  const subCategoryName = products.subCategoryId.name;
  const subCategorySlug = products.subCategoryId.slug;

  const breadcrumbs = [
    {
      caption: 'Productos',
      routerLink: '/products/',
    },
    {
      caption: categoryName,
      routerLink: `/products/${categorySlug}/`,
    },
    {
      caption: subCategoryName,
      routerLink: `/products/${categorySlug}/${subCategorySlug}`,
    },
    {
      caption: productName,
      routerLink: `/product/${productSlug}`,
      routerLinkActiveOptions: { exact: true },
    },
  ];

  return breadcrumbs;
};
