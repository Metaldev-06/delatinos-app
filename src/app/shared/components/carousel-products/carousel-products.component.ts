import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';

import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiCarousel, TuiPagination, TuiSkeleton } from '@taiga-ui/kit';

import { ProductsCardComponent } from '../products-card/products-card.component';
import { ProductData } from '../../../core/interfaces/products.interfaces';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TitleCasePipe } from '@angular/common';
import { TitleComponent } from '../title/title.component';
import { SkeletonCardComponent } from '../skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-carousel-products',
  standalone: true,
  imports: [
    TuiCarousel,
    TuiPagination,
    ProductsCardComponent,
    TuiButton,
    TitleComponent,
    SkeletonCardComponent,
    TuiSkeleton,
  ],
  templateUrl: './carousel-products.component.html',
  styleUrl: './carousel-products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselProductsComponent {
  public products = input.required<ProductData[]>();
  public title = input.required<string>();

  public itemsCount = signal<number>(4);
  protected index = 0;

  private x = 24;
  public items = Array.from({ length: this.x }, (_, i) => i);

  private readonly breakpointObserver = inject(BreakpointObserver);

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web])
      .subscribe((result) => {
        console.log(result);

        if (result.matches) {
          if (result.breakpoints[Breakpoints.Handset]) {
            this.itemsCount.set(1);
          } else if (result.breakpoints[Breakpoints.Tablet]) {
            this.itemsCount.set(2);
          } else {
            this.itemsCount.set(4);
          }
        }
      });
  }
  public nextSlide(): void {
    if (this.index === this.products().length - 4) {
      this.index = 0;
    } else {
      this.index++;
    }
  }

  public prevSlide(): void {
    if (this.index === 0) {
      this.index = this.products().length - 4;
    } else {
      this.index--;
    }
  }
}
