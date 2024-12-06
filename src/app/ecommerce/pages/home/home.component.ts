import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ProductData } from '../../../core/interfaces/products.interfaces';
import { ProductsService } from '../../../core/services/products.service';
import { CarouselProductsComponent } from '../../../shared/components/carousel-products/carousel-products.component';
import { CountriesSectionComponent } from '../../../shared/components/countries-section/countries-section.component';
import { DividerComponent } from '../../../shared/components/divider/divider.component';
import { ProductsGridComponent } from '../../../shared/components/products-grid/products-grid.component';

@Component({
    selector: 'app-home',
    imports: [
        CountriesSectionComponent,
        CarouselProductsComponent,
        DividerComponent,
        ProductsGridComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public products = signal<ProductData[]>([]);

  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getLatestProducts();
  }

  getLatestProducts(): void {
    this.productsService
      .getLatestProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => {
        this.products.set(products.data);
      });
  }
}
