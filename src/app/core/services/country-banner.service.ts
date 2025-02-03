import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryBannerResponse } from '../interfaces/country-banner.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryBannerService {
  private readonly baseUrl = environment.baseUrl;
  private readonly http = inject(HttpClient);

  getCountryBanner(country: string): Observable<CountryBannerResponse> {
    return this.http.get<CountryBannerResponse>(
      `${this.baseUrl}/country-banner/${country}`,
    );
  }
}
