import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { IPaginationMeta } from 'app/types/api-response.types';
import { IPaginationQuery } from 'app/types/query-filters.types';

@Component({
  selector: 'app-paginator-component',
  imports: [MatPaginatorModule],
  templateUrl: './paginator-component.html',
  styleUrl: './paginator-component.scss',
})
export class PaginatorComponent {
  @Input() paginationMeta = signal<IPaginationMeta | null>(null);
  @Output() pageChange = new EventEmitter<number>();
  pageEvent: PageEvent | undefined;

  handlePageChange(e: PageEvent) {
    this.pageEvent = e;
    const pagePos = this.pageEvent.pageIndex + 1;
    this.pageChange.emit(pagePos);
  }
}
