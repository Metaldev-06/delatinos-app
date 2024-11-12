import {Component, inject, OnInit, signal} from '@angular/core';
import { CountriesSectionComponent } from '../../../shared/components/countries-section/countries-section.component';
import {ProductsService} from '../../../core/services/products.service';
import {ProductData, Products} from '../../../core/interfaces/products.interfaces';
import {CurrencyPipe, TitleCasePipe} from '@angular/common';
import {CarouselProductsComponent} from '../../../shared/components/carousel-products/carousel-products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountriesSectionComponent, TitleCasePipe, CurrencyPipe, CarouselProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public products = signal<ProductData[]>([])

  private readonly productsService = inject(ProductsService);


  ngOnInit(): void {
    this.productsService.getProducts().subscribe( (products) => {
      this.products.set(products.data)
    } )
  }
}
