import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TuiDataList} from '@taiga-ui/core';
import {TuiDataListWrapper} from '@taiga-ui/kit';
import {TuiSelectModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

@Component({
  selector: 'app-select-filter',
  standalone: true,
  imports: [
    TuiDataList,
    TuiDataListWrapper,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule
  ],
  templateUrl: './select-filter.component.html',
  styleUrl: './select-filter.component.css'
})
export class SelectFilterComponent {
  protected items = [
    'Precio: menor a mayor',
    'Precio: mayor a menor',
    'Nombre: A - Z',
    'Nombre: Z - A',
  ];

  protected filterValue = new FormControl<string | null>(null);
}
