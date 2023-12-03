import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

export enum InputType {
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXT = 'text'
}

@Component({
  selector: 'bs-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() id = '';
  @Input() name = '';
  @Input({ required: true }) type!: InputType;
  @Input() placeholder = '';
  @Input() delay = 0;

  @Output() textEvent = new EventEmitter();

  inputText = new FormControl('');

  public InputType = InputType;

  text = '';
  touched = false;
  disabled = false;

  ngOnInit(): void {
    this.inputText.valueChanges
      .pipe(debounceTime(this.delay))
      .subscribe((value) => {
        this.textEvent.emit(value);
      });
  }

  updateText(event: any) {
    const inputValue = event.target.value;
    this.text = inputValue;
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
