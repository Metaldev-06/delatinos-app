import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  TuiDataList,
  TuiDropdown,
  TuiIcon,
  TuiSizeL,
  TuiSizeS,
} from '@taiga-ui/core';
import { TuiBadgedContent, TuiDataListDropdownManager } from '@taiga-ui/kit';

import { SearcherComponent } from '../../../../../shared/components/searcher/searcher.component';
import { CategoriesService } from '../../../../../core/services/categories.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriesData } from '../../../../../core/interfaces/categories.interface';

@Component({
    selector: 'app-nav',
    imports: [
        TuiIcon,
        TuiBadgedContent,
        SearcherComponent,
        RouterLink,
        RouterLinkActive,
        TuiDataList,
        TuiDataListDropdownManager,
        TuiDropdown,
    ],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  public categories = signal<CategoriesData[]>([]);

  protected dropdownOpen = false;
  protected size: TuiSizeL | TuiSizeS = 'l';

  protected open = false;

  private readonly categoriesSertvice = inject(CategoriesService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.categoriesSertvice
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((categories) => {
        this.categories.set(categories.data);
      });
  }
}
