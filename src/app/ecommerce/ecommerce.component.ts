import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-ecommerce',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HeaderComponent, FooterComponent],
  templateUrl: './ecommerce.component.html',
  styleUrl: './ecommerce.component.css',
})
export class EcommerceComponent  {
}
