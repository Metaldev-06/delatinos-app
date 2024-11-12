import {ChangeDetectionStrategy, Component, input, OnInit} from '@angular/core';
import {TuiCarousel, TuiPagination} from '@taiga-ui/kit';
import {ProductsCardComponent} from '../products-card/products-card.component';
import {ProductData} from '../../../core/interfaces/products.interfaces';
import {TuiButton} from '@taiga-ui/core';

@Component({
  selector: 'app-carousel-products',
  standalone: true,
  imports: [TuiCarousel, TuiPagination, ProductsCardComponent, TuiButton],
  templateUrl: './carousel-products.component.html',
  styleUrl: './carousel-products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselProductsComponent implements OnInit {
  public products = input.required<ProductData[]>();

  protected index = 0;

  ngOnInit(): void {
    console.log(this.products())
  }
}
