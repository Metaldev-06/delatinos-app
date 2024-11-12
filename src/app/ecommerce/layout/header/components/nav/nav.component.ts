import { Component } from '@angular/core';

import { TuiIcon } from '@taiga-ui/core';
import { TuiBadgedContent } from '@taiga-ui/kit';
import { SearcherComponent } from '../../../../../shared/components/searcher/searcher.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [TuiIcon, TuiBadgedContent, SearcherComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {}
