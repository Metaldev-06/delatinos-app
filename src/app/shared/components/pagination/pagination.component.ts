import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiPagination } from '@taiga-ui/kit';
import { Pagination } from '../../../core/interfaces/products.interfaces';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [FormsModule, TuiPagination],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  public pagination = input.required<Pagination>();
  public pageChange = output<number>();

  protected get length(): number {
    return this.pagination().pages; // Total de productos
  }

  protected get index(): number {
    return this.pagination().current - 1; // Páginas empiezan en 0
  }

  protected goToPage(index: number): void {
    this.pageChange.emit(index); // Emitir página en formato 1-based
  }
}
