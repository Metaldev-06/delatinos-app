import { Component, input } from '@angular/core';
import { ProductData } from '../../../core/interfaces/products.interfaces';
import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-products-card',
    imports: [CurrencyPipe, TitleCasePipe, RouterLink, NgClass],
    templateUrl: './products-card.component.html',
    styleUrl: './products-card.component.css'
})
export class ProductsCardComponent {
  public product = input.required<ProductData>();

  addToCart(event: Event): void {
    event.stopPropagation(); // Detiene la propagación del clic
    console.log('Producto añadido al carrito');
    // Aquí puedes llamar a un servicio para manejar el carrito
  }
}
