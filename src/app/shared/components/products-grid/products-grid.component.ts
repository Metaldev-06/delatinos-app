import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TuiBlockStatus } from '@taiga-ui/layout';

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
import { SkeletonCardComponent } from '../skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [
    ProductsCardComponent,
    TitleComponent,
    SelectFilterComponent,
    PaginationComponent,
    SkeletonCardComponent,
    TuiBlockStatus,
  ],
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsGridComponent implements OnInit {
  public country = input<string>('');

  public products = signal<ProductData[]>([]);
  public data = signal<Products>({} as Products);
  public loading = signal<boolean>(false);
  public completed = signal<boolean>(false);

  private productFilter = signal<SelectFilter>({
    name: 'Todos',
    value: 'id',
    direction: 'asc',
  });

  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getProducts(undefined, undefined, undefined, this.country());
    // console.log(this.country());
  }

  public getProducts(
    filter?: SelectFilter,
    offset?: number,
    limit?: number,
    country?: string,
  ): void {
    this.productsService
      .getProducts(filter, offset, limit, country)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products) => {
          this.products.set(products.data);
          this.data.set(products);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.completed.set(true);
        },
        complete: () => this.completed.set(true),
      });
  }

  public emitFilter(filter: SelectFilter): void {
    this.getProducts(filter, undefined, undefined, this.country());
    this.productFilter.set(filter);
  }

  public emitPage(page: number): void {
    this.getProducts(this.productFilter(), page, undefined, this.country());
  }
}
