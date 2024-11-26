import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  ProductData,
  Products,
} from '../../../core/interfaces/products.interfaces';
import { ProductsCardComponent } from '../products-card/products-card.component';
import { TitleComponent } from '../title/title.component';
import { SelectFilterComponent } from '../select-filter/select-filter.component';
import { ProductsService } from '../../../core/services/products.service';
import { SelectFilter } from '../../../core/interfaces/select-filter.interface';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [
    ProductsCardComponent,
    TitleComponent,
    SelectFilterComponent,
    PaginationComponent,
  ],
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsGridComponent implements OnInit {
  public products = signal<ProductData[]>([]);
  public data = signal<Products>({} as Products);

  private productFilter = signal<SelectFilter>({
    name: 'Todos',
    value: 'id',
    direction: 'asc',
  });

  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(filter?: SelectFilter, offset?: number): void {
    this.productsService
      .getProducts(filter, offset)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => {
        this.products.set(products.data);
        this.data.set(products);
      });
  }

  public emitFilter(filter: SelectFilter): void {
    this.getProducts(filter);
    this.productFilter.set(filter);
  }

  public emitPage(page: number): void {
    this.getProducts(this.productFilter(), page);
  }
}
