import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TuiAlertService, TuiTextfield } from '@taiga-ui/core';
import { TuiBlockStatus } from '@taiga-ui/layout';
import { TuiBreadcrumbs } from '@taiga-ui/kit';
import { TuiItem } from '@taiga-ui/cdk';

import { Breadcrumb } from '../../../core/interfaces/breadcrumbs.interface';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CarouselProductsComponent } from '../../../shared/components/carousel-products/carousel-products.component';
import { DividerComponent } from '../../../shared/components/divider/divider.component';
import { GenerateBreadcrumbs } from '../../../core/helpers/generateBreadcrumbs.helper';
import { OneProductReponse } from '../../../core/interfaces/product.interface';
import { ProductData } from '../../../core/interfaces/products.interfaces';
import { ProductsService } from '../../../core/services/products.service';
import { SkeletonComponent } from './components/skeleton/skeleton.component';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-view',
  imports: [
    DividerComponent,
    CarouselProductsComponent,
    TuiItem,
    TuiBreadcrumbs,
    RouterLink,
    TitleCasePipe,
    CurrencyPipe,
    TuiBlockStatus,
    SkeletonComponent,
    ButtonComponent,
    NgClass,
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductViewComponent implements OnInit {
  @Input('slug') private slug!: string;

  private readonly productsService = inject(ProductsService);
  private readonly tuiAlertService = inject(TuiAlertService);
  private readonly destroyRef = inject(DestroyRef);

  public product = signal<OneProductReponse>({} as OneProductReponse);
  public relatedProducts = signal<ProductData[]>([]);
  public isLoading = signal<boolean>(true);
  public isError = signal<boolean>(false);

  protected breadcrumbs: Breadcrumb[] = [];
  protected value: number | null = null;

  ngOnInit(): void {
    this.getOneProduct(this.slug);
  }

  private getOneProduct(term: string): void {
    this.productsService.getOneProduct(term).subscribe({
      next: (product) => {
        this.product.set(product as OneProductReponse);
        this.isLoading.set(false);

        // Generar los breadcrumbs dinámicamente
        this.breadcrumbs = GenerateBreadcrumbs(product as OneProductReponse);

        this.realatedProducts(
          product.categoryId.slug!,
          product.subCategoryId.slug!,
        );
      },
      error: (error) => {
        this.alert(error);
        console.error(error);
        this.isError.set(true);
      },
    });
  }

  private realatedProducts(category: string, subcategory: string): void {
    this.productsService.getRelatedProducts(category, subcategory).subscribe({
      next: (products) => {
        this.relatedProducts.set(products.data);
      },
      error: (error) => {
        this.alert(error);
        console.error(error);
      },
    });
  }

  private alert(error: Error): void {
    this.tuiAlertService
      .open(`${error.message}`, {
        label: `${error.name}`,
        appearance: 'error',
        closeable: true,
        autoClose: 0,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    console.error(error);
  }
}
