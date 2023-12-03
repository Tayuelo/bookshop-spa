import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { AuthService } from '@bs-shared/services';
import { InputComponent, InputType } from '@bs-shared/components';
import { MarketplaceService } from '../../services/marketplace.service';

@Component({
  selector: 'bs-header',
  standalone: true,
  imports: [CommonModule, NavigationComponent, InputComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public InputType = InputType;

  authService = inject(AuthService);
  marketplaceService = inject(MarketplaceService);

  searchBooks(searchCriteria: string) {
    this.marketplaceService.setSearchCriteria(searchCriteria);
  }
}
