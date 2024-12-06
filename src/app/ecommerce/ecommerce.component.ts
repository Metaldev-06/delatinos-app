import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-ecommerce',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './ecommerce.component.html',
  styleUrl: './ecommerce.component.css',
})
export class EcommerceComponent {}
