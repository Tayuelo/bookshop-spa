import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input({ required: true }) data!: any;

  #router = inject(Router);

  selectItem() {
    this.#router.navigateByUrl(`/book/${this.data._id}`);
  }
}
