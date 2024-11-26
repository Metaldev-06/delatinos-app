import { Component, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TuiDataList } from '@taiga-ui/core';
import { TuiDataListWrapper, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import {
  TuiSelectModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { SelectFilter } from '../../../core/interfaces/select-filter.interface';

@Component({
  selector: 'app-select-filter',
  standalone: true,
  imports: [
    TuiDataList,
    TuiDataListWrapper,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './select-filter.component.html',
  styleUrl: './select-filter.component.css',
  providers: [
    tuiItemsHandlersProvider({
      stringify: (item: SelectFilter) => `${item.name}`,
    }),
  ],
})
export class SelectFilterComponent implements OnInit {
  public selectedFilter = output<SelectFilter>();

  protected readonly items: SelectFilter[] = [
    {
      name: 'Precio: menor a mayor',
      value: 'price',
      direction: 'asc',
    },
    {
      name: 'Precio: mayor a menor',
      value: 'price',
      direction: 'desc',
    },
    {
      name: 'Nombre: A - Z',
      value: 'name',
      direction: 'asc',
    },
    {
      name: 'Nombre: Z - A',
      value: 'name',
      direction: 'desc',
    },
  ];

  protected filterValue = new FormControl<string | null>(null);

  ngOnInit(): void {
    this.filterValue.valueChanges.subscribe((value) => {
      this.emitFilter(value);
    });
  }

  public emitFilter(filter: any): void {
    this.selectedFilter.emit(filter);
  }
}
