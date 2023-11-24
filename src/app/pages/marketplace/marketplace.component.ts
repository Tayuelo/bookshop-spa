import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { MarketplaceService } from './services/marketplace.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from '../../services/auth.interceptor';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss',
  providers: [MarketplaceService,     {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  }]
})
export class MarketplaceComponent {
  private marketPlaceService = inject(MarketplaceService);

  books$ = this.marketPlaceService.books$.pipe(
    catchError(this.handleError)
  );

  private handleError(error: Error) {
    return of([]);
  }
}
