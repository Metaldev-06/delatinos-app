import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {CountriesResponse} from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly baseUrl = environment.baseUrl;
  private readonly http = inject(HttpClient);

  getCountries():Observable<CountriesResponse> {
    return this.http.get<CountriesResponse>(`${this.baseUrl}/countries`)
  }
}
