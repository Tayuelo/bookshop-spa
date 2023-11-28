import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'book/:id',
    loadComponent: () =>
      import('./components/book/book.component').then(
        (c) => c.BookComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'marketplace',
  },
];
