import { Component, inject, signal } from '@angular/core';
import { MatFormField, MatLabel, MatError, MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingButton } from '@shared/components/ui/loading-button/loading-button';

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatFormField,
    MatLabel,
    MatError,
    MatIcon,
    ReactiveFormsModule,
    LoadingButton
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  hidePassword = signal(true);
  private _fb = inject(FormBuilder);

  loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  getLoginError(controlName: string): string {
    const control = this.loginForm.get(controlName);

    if (!control || !control.errors || !control.touched) return '';

    if (control.hasError('required')) return 'This field is required';
    if (control.hasError('email')) return 'Invalid email address';

    return 'Invalid field';
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log(this.loginForm.value);
  }
}
