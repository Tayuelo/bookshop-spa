import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPasswordValidator } from '../../validators/validators';
import { AuthService } from '@bs-shared/services';

@Component({
  selector: 'bs-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  public fb = inject(FormBuilder);
  private authService = inject(AuthService);
  public loading = this.authService.loading;

  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    confirmedPassword: ['', [Validators.required, Validators.minLength(3), matchPasswordValidator('password')]]
  });

  register() {
    const { confirmedPassword, ...user } = this.form.value;
    this.authService.register(user);
  }

  login() {
    this.authService.shouldRegister.set(false);
  }
}
