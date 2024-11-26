import { Component } from '@angular/core';

import { TuiIcon } from '@taiga-ui/core';
import { TuiBadgedContent } from '@taiga-ui/kit';
import { SearcherComponent } from '../../../../../shared/components/searcher/searcher.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    TuiIcon,
    TuiBadgedContent,
    SearcherComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {}
