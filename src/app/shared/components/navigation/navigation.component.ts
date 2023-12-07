import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@bs-shared/services';
@Component({
  selector: 'bs-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  @ViewChild('nav', { static: true }) nav!: ElementRef;
  authService = inject(AuthService);
  renderer = inject(Renderer2);
}
