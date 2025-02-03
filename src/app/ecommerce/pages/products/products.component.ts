import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import {
  ProductData,
  Products,
} from '../../../core/interfaces/products.interfaces';
import { ProductsCardComponent } from '../../../shared/components/products-card/products-card.component';
import { ProductsParams } from '../../../core/interfaces/products-params.interface';

@Component({
  selector: 'app-products',
  imports: [ProductsCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  private options = signal<ProductsParams>({} as ProductsParams);

  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly productsService = inject(ProductsService);

  public products = signal<Products>({} as Products);
  public isError = signal<boolean>(false);
  public isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.getParams();
  }

  private getAllProducts(options: ProductsParams): void {
    this.productsService
      .getAllProducts(options)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products) => {
          this.products.set(products);
        },
        error: (error) => {
          this.isError.set(true);
          console.error(error);
        },
      });
  }

  private getParams() {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const term = params['term'];
        this.options.set({
          limit: 10,
          offset: 0,
          term: term,
        });

        this.getAllProducts(this.options());
      });
  }
}
