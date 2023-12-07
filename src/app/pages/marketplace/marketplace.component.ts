import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceService } from './services/marketplace.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { GridComponent } from './components/grid/grid.component';
import { AuthorizationInterceptor } from '@bs-shared/services';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { InputComponent, InputType } from '@bs-shared/components';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, GridComponent, HeaderComponent, InputComponent],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css',
  providers: [
    MarketplaceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
  ],
})
export class MarketplaceComponent {
  private marketPlaceService = inject(MarketplaceService);
  public InputType = InputType;

  books$ = this.marketPlaceService.books$.pipe(catchError(this.handleError));

  marketplaceService = inject(MarketplaceService);

  private handleError(error: Error) {
    return of([]);
  }

  searchBooks(searchCriteria: string) {
    this.marketplaceService.setSearchCriteria(searchCriteria);
  }
}
