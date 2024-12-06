import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CountriesService } from '../../../core/services/countries.service';
import {
  CountriesData,
  CountriesResponse,
} from '../../../core/interfaces/countries.interface';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-countries-section',
    imports: [TitleCasePipe, RouterLink],
    templateUrl: './countries-section.component.html',
    styleUrl: './countries-section.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountriesSectionComponent implements OnInit {
  public countries = signal<CountriesData[]>([]);

  private readonly countriesService = inject(CountriesService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.countriesService
      .getCountries()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((countries: CountriesResponse) => {
        this.countries.set(countries.data);
      });
  }
}
