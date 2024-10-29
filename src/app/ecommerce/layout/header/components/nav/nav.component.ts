import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [TuiIcon, ReactiveFormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  public searchForm!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required, this.noSpaceValidator]],
    });
  }

  private noSpaceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (value?.trim().length === 0) {
      return { noOnlySpaces: true };
    }
    return null;
  }
}
