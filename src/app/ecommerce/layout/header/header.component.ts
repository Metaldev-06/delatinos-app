import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, NavComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
