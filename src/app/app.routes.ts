import { Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';

export const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationComponent,
  },
  {
    path: 'marketplace',
    loadComponent: () =>
      import('./pages/marketplace/marketplace.component').then(
        (c) => c.MarketplaceComponent
      ),
  },
  {
    path: 'book/:id',
    loadComponent: () =>
      import('./pages/marketplace/components/book/book.component').then(
        (c) => c.BookComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'marketplace',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'authentication',
  },
];
