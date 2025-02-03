import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noSpaceValidator } from '../../../core/helpers/noSpaceValidator.helper';

import { TuiIcon } from '@taiga-ui/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searcher',
  imports: [ReactiveFormsModule, TuiIcon],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.css',
})
export class SearcherComponent {
  public searchForm!: FormGroup;

  private lastSearchValue = signal<string | null>(null);

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required, noSpaceValidator]],
    });
  }

  public onSubmit(): void {
    const currentSearchValue = this.searchForm.get('search')?.value.trim();

    if (
      this.searchForm.valid &&
      currentSearchValue !== this.lastSearchValue()
    ) {
      this.router.navigate(['/products'], {
        queryParams: { term: currentSearchValue },
      });
      this.lastSearchValue.set(currentSearchValue);
      // this.searchForm.reset();
    } else if (currentSearchValue === this.lastSearchValue) {
      console.log('Ya has realizado esta búsqueda previamente.');
    }
  }
}
