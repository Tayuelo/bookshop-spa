import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from '@bs-shared/services';
import { HeaderComponent } from '@bs-shared/components';
import { Observable } from 'rxjs';
import { IBook } from '@bs-shared/models';

@Component({
  selector: 'bs-book',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {

  @Input('id') id = '';

  public loading = signal(false);

  public booksService = inject(BooksService);

  public book$: Observable<IBook> = this.booksService.book$;

  ngOnInit(): void {
    this.booksService.bookSelected.next(this.id);
  }

  buy() {}
}
