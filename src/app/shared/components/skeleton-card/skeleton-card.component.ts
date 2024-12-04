import { Component, input } from '@angular/core';
import { TuiSkeleton } from '@taiga-ui/kit';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [TuiSkeleton],
  templateUrl: './skeleton-card.component.html',
  styleUrl: './skeleton-card.component.css',
})
export class SkeletonCardComponent {
  private readonly x = 12;

  public items = Array.from({ length: this.x }, (_, i) => i);
  public isCarousel = input.required<boolean>();
}
