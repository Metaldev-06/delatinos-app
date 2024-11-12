import { TitleCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

interface Country {
  name: string;
  image: string;
}

@Component({
  selector: 'app-countries-section',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './countries-section.component.html',
  styleUrl: './countries-section.component.css',
})
export class CountriesSectionComponent {
  public countries = signal<Country[]>([
    {
      name: 'argentina',
      image: 'argentina.jpg',
    },
    {
      name: 'colombia',
      image: 'colombia.svg',
    },
    {
      name: 'mexico',
      image: 'mexico.svg',
    },
    {
      name: 'venezuela',
      image: 'venezuela.svg',
    },
  ]);
}
