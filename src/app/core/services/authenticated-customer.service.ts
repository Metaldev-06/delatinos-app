import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { StoreCustomer } from '../interfaces/store-customer.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedCustomerService {
  private readonly _storage = inject(StorageService);

  private _customer = signal<StoreCustomer>({
    id: '',
    name: '',
    email: '',
    isAutehnticated: false,
    image: '',
    username: '',
  });

  readonly state = computed(() => this._customer);

  constructor() {
    const customerDataLocal = this._storage.get<StoreCustomer>('customer');
    const token = this._storage.get<string>('session');

    if (customerDataLocal && token) {
      this.setCustomer({
        id: customerDataLocal.id,
        name: customerDataLocal.name,
        email: customerDataLocal.email,
        isAutehnticated: true,
        image: customerDataLocal.image,
        username: customerDataLocal.username,
      });
    }
  }

  setCustomer(customer: StoreCustomer): void {
    this._customer.set(customer);
  }

  getCustomer(): StoreCustomer {
    return this._customer();
  }

  clearCustomer(): void {
    this._customer.set({
      id: '',
      name: '',
      email: '',
      isAutehnticated: false,
      image: '',
      username: '',
    });
  }
}
