import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

export enum InputType {
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXT = 'text',
  SEARCH = 'search',
}

@Component({
  selector: 'bs-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) type!: InputType;
  @Input() placeholder!: string;

  text = '';
  touched = false;
  disabled = false;

  updateText(text: string) {
    this.text = text;
    this.onChange(this.text);
  }

  onChange = (text: string) => {};

  onTouched = () => {};

  writeValue(text: string): void {
    this.text = text;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
