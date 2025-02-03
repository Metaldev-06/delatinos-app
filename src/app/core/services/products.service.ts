import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ProductData, Products } from '../interfaces/products.interfaces';
import { SelectFilter } from '../interfaces/select-filter.interface';
import { ProductsParams } from '../interfaces/products-params.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly baseUrl = environment.baseUrl;
  private readonly http = inject(HttpClient);

  getProducts(
    filter?: SelectFilter,
    offset = 0,
    limit = 10,
    country?: string,
  ): Observable<Products> {
    let params = new HttpParams();

    // Agrega filtro de orden si existe
    if (filter) {
      params = params.set('sort', filter.value).set('order', filter.direction);
    }

    if (offset) {
      offset = offset * limit;
      params = params.set('offset', offset);
    }

    if (limit) {
      params = params.set('limit', limit);
    }

    if (country) {
      params = params.set('country', country);
    }
    return this.http.get<Products>(`${this.baseUrl}/products`, { params });
  }

  getAllProducts({
    country,
    filter,
    limit = 10,
    offset = 0,
    term,
  }: ProductsParams): Observable<Products> {
    let params = new HttpParams();

    // Agrega filtro de orden si existe
    if (filter) {
      params = params.set('sort', filter.value).set('order', filter.direction);
    }

    if (offset && limit) {
      offset = offset * limit;
      params = params.set('offset', offset);
    }

    if (limit) {
      params = params.set('limit', limit);
    }

    if (country) {
      params = params.set('country', country);
    }

    if (term) {
      params = params.set('term', term);
    }

    return this.http.get<Products>(`${this.baseUrl}/products`, { params });
  }

  getRelatedProducts(
    category: string,
    subcategory: string,
  ): Observable<Products> {
    const params = new HttpParams()
      .set('category', category)
      .set('subCategory', subcategory);
    return this.http.get<Products>(`${this.baseUrl}/products`, { params });
  }

  getLatestProducts(): Observable<Products> {
    const params = new HttpParams()
      .set('order', 'asc')
      .set('sort', 'updatedAt');
    return this.http.get<Products>(`${this.baseUrl}/products`, { params });
  }

  getOneProduct(term: string): Observable<ProductData> {
    return this.http.get<ProductData>(`${this.baseUrl}/products/${term}`);
  }
}
