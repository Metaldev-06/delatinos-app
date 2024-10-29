import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
