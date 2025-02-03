import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  TuiDataList,
  TuiDialogService,
  TuiDropdown,
  TuiIcon,
  TuiSizeL,
  TuiSizeS,
} from '@taiga-ui/core';
import {
  TUI_CONFIRM,
  TuiBadgedContent,
  TuiDataListDropdownManager,
} from '@taiga-ui/kit';

import { SearcherComponent } from '../../../../../shared/components/searcher/searcher.component';
import { CategoriesService } from '../../../../../core/services/categories.service';
import { CategoriesData } from '../../../../../core/interfaces/categories.interface';
import { AuthenticatedCustomerService } from '../../../../../core/services/authenticated-customer.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { StoreCustomer } from '../../../../../core/interfaces/store-customer.interface';

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
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  public categories = signal<CategoriesData[]>([]);
  public customerData = signal<StoreCustomer>({} as StoreCustomer);

  protected dropdownOpen = false;
  protected size: TuiSizeL | TuiSizeS = 'l';

  protected dropDownProducts = false;
  protected dropDownUserActions = false;

  private readonly categoriesSertvice = inject(CategoriesService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authenticatedCustomerService = inject(
    AuthenticatedCustomerService,
  );
  private readonly storage = inject(StorageService);
  private readonly dialogService = inject(TuiDialogService);

  ngOnInit(): void {
    this.getCategories();
    this.customerData.set(this.authenticatedCustomerService.getCustomer());
  }

  logout(): void {
    this.authenticatedCustomerService.clearCustomer();
    this.storage.remove('session');
    this.storage.remove('customer');
    this.customerData.set(this.authenticatedCustomerService.getCustomer());
  }

  private getCategories() {
    this.categoriesSertvice
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((categories) => {
        this.categories.set(categories.data);
      });
  }

  protected openDialog(): void {
    this.dialogService
      .open<boolean>(TUI_CONFIRM, {
        label: '¿Estás seguro de que quieres hacer esto?',
        data: {
          content: 'No podrás deshacer esta acción',
          yes: 'Cerrar Sesión',
          no: 'Cancelar',
        },
      })
      .subscribe((response) => {
        if (response) {
          this.logout();
        }
      });
  }
}
