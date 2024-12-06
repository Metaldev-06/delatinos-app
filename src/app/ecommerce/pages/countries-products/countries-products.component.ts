import { Component, OnInit, Input as RouterInput } from '@angular/core';
import { ProductsGridComponent } from '../../../shared/components/products-grid/products-grid.component';

@Component({
    selector: 'app-countries-products',
    imports: [ProductsGridComponent],
    templateUrl: './countries-products.component.html',
    styleUrl: './countries-products.component.css'
})
export class CountriesProductsComponent implements OnInit {
  @RouterInput() countryName: string = '';

  ngOnInit(): void {}
}
