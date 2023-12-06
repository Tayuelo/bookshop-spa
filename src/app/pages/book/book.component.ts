import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from '@bs-shared/services';

@Component({
  selector: 'bs-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {

  @Input('id') id = '';

  public booksService = inject(BooksService);

  public book$ = this.booksService.book$;

  ngOnInit(): void {
    this.booksService.bookSelected.next(this.id);
  }
}
