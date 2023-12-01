import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@bs-shared/services';
import { InputComponent, InputType } from '@bs-shared/components';

@Component({
  selector: 'bs-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  public fb = inject(FormBuilder);
  public loading = this.authService.loading;

  public InputType = InputType;

  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  login() {
    const user = this.form.value;
    this.authService.login(user);
  }

  register() {
    this.authService.shouldRegister.set(true);
  }
}
