import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBook } from '@bs-shared/models';
import { CardComponent } from '@bs-shared/components';

@Component({
  selector: 'bs-grid',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {
  @Input ({ required: true }) books!: IBook[];
}
