import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {CountriesSectionComponent} from '../../../shared/components/countries-section/countries-section.component';
import {ProductsService} from '../../../core/services/products.service';
import {ProductData, Products} from '../../../core/interfaces/products.interfaces';
import {CurrencyPipe, TitleCasePipe} from '@angular/common';
import {CarouselProductsComponent} from '../../../shared/components/carousel-products/carousel-products.component';
import {ProductsCardComponent} from '../../../shared/components/products-card/products-card.component';
import {DividerComponent} from '../../../shared/components/divider/divider.component';
import {ProductsGridComponent} from '../../../shared/components/products-grid/products-grid.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CountriesSectionComponent,
    TitleCasePipe,
    CurrencyPipe,
    CarouselProductsComponent,
    ProductsCardComponent,
    DividerComponent,
    ProductsGridComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public products = signal<ProductData[]>([])
  public data = signal<Products>({} as Products)

  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((products) => {
      this.products.set(products.data);
      this.data.set(products);
    })
  }
}
