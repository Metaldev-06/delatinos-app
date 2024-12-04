import { Routes } from '@angular/router';
import { EcommerceComponent } from './ecommerce.component';

export const EcommerceRoutes: Routes = [
  {
    path: '',
    component: EcommerceComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.routes').then((m) => m.HomeRoutes),
      },
      {
        path: 'country/:countryName',
        loadChildren: () =>
          import('./pages/countries-products/country.routes').then(
            (m) => m.CountryRoutes,
          ),
      },
      {
        path: 'product/:slug',
        loadChildren: () =>
          import('./pages/product-view/product-view.routes').then(
            (m) => m.ProductViewRoutes,
          ),
      },
      {
        path: 'shipping-information',
        loadChildren: () =>
          import(
            './pages/shipping-information/shipping-information.routes'
          ).then((m) => m.ShippingInformationRoutes),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products/products.routes').then(
            (m) => m.ProductsRoutes,
          ),
      },
    ],
  },
];
