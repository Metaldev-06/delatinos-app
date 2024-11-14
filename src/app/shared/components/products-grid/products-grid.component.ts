import {ChangeDetectionStrategy, Component, input} from '@angular/core';

import {Products} from '../../../core/interfaces/products.interfaces';
import {ProductsCardComponent} from '../products-card/products-card.component';
import {TitleComponent} from '../title/title.component';
import {SelectFilterComponent} from '../select-filter/select-filter.component';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [
    ProductsCardComponent,
    TitleComponent,
    SelectFilterComponent
  ],
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsGridComponent {
  public products = input.required<Products>()


}
