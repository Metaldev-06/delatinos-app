import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginData, LoginResponse } from '../interfaces/login.interface';
import {
  RegisterData,
  RegisterResponse,
} from '../interfaces/register.interface';
import { StorageService } from '../../core/services/storage.service';
import { AuthenticatedCustomerService } from '../../core/services/authenticated-customer.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.baseUrl;
  private readonly http = inject(HttpClient);
  private readonly storage = inject(StorageService);
  private readonly authenticatedCustomerService = inject(
    AuthenticatedCustomerService,
  );

  login({ password, email }: LoginData): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          const customerData = {
            id: response.customer.id,
            name: response.customer.firstName,
            email: response.customer.email,
            isAutehnticated: true,
            image: response.customer.image,
            username: response.customer.username,
          };
          this.authenticatedCustomerService.setCustomer(customerData);
          this.storage.set('session', response.token);
          this.storage.set('customer', customerData);
        }),
      );
  }

  register(register: RegisterData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/auth/register`, {
      register,
    });
  }
}
