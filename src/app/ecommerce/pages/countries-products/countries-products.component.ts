import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Input as RouterInput,
  signal,
} from '@angular/core';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TuiSkeleton } from '@taiga-ui/kit';

import { ProductsGridComponent } from '../../../shared/components/products-grid/products-grid.component';
import { CountryBannerService } from '../../../core/services/country-banner.service';
import { CountryBannerResponse } from '../../../core/interfaces/country-banner.interface';

@Component({
  selector: 'app-countries-products',
  imports: [ProductsGridComponent, TuiSkeleton],
  templateUrl: './countries-products.component.html',
  styleUrl: './countries-products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesProductsComponent implements OnInit {
  @RouterInput() countryName: string = '';

  public banner = signal<CountryBannerResponse>({} as CountryBannerResponse);
  public isLoading = signal<boolean>(false);
  public isError = signal<boolean>(false);

  private readonly countryBanner = inject(CountryBannerService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.countryBanner
      .getCountryBanner(this.countryName)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (countryBanner: CountryBannerResponse) => {
          this.banner.set(countryBanner);
          this.isLoading.set(true);
        },
        error: (error) => {
          this.isLoading.set(true);
          this.isError.set(true);
          console.log(error);
        },
        // complete: () => {
        //   this.isLoading.set(true);
        // },
      });
  }
}
