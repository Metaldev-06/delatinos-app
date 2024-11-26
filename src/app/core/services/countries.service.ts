import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CountriesResponse } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly baseUrl = environment.baseUrl;
  private readonly http = inject(HttpClient);

  getCountries(offset = 0, limit = 6): Observable<CountriesResponse> {
    const params = new HttpParams().set('offset', offset).set('limit', limit);

    return this.http.get<CountriesResponse>(`${this.baseUrl}/countries`, {
      params,
    });
  }
}
