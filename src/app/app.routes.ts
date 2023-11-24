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
    path: '',
    pathMatch: 'full',
    redirectTo: 'marketplace',
  },
];
