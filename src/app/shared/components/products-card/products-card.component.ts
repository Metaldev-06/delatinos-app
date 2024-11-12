import {Component, input} from '@angular/core';
import {ProductData} from '../../../core/interfaces/products.interfaces';
import {CurrencyPipe, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    TitleCasePipe
  ],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.css'
})
export class ProductsCardComponent {
  public product = input.required<ProductData>()
}
