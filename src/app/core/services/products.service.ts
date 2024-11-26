import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Products } from '../interfaces/products.interfaces';
import { SelectFilter } from '../interfaces/select-filter.interface';

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
    return this.http.get<Products>(`${this.baseUrl}/products`, { params });
  }

  getLatestProducts(): Observable<Products> {
    const params = new HttpParams()
      .set('order', 'asc')
      .set('sort', 'updatedAt');
    return this.http.get<Products>(`${this.baseUrl}/products`, { params });
  }
}
