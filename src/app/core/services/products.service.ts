import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Products} from '../interfaces/products.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly baseUrl = environment.baseUrl;
  private readonly http = inject(HttpClient);

  getProducts():Observable<Products> {
    return this.http.get<Products>(`${this.baseUrl}/products`)
  }
}
