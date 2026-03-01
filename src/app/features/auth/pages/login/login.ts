import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatFormField, MatLabel, MatError, MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingButton } from '@shared/components/ui/loading-button/loading-button';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { LoginService } from '@features/auth/services/login/login-service';
import { IUserLogin } from '@features/auth/models/login.model';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IErrorResponse } from 'app/types/api-response.types';
import { AuthService } from '@core/service/auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatFormField,
    MatLabel,
    MatError,
    MatIcon,
    ReactiveFormsModule,
    LoadingButton,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  hidePassword = signal(true);
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
  private _loginService = inject(LoginService);
  private _authService = inject(AuthService);

  isLoading = signal(false);
  isSubmitted = signal(false);

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

  navigateSignup() {
    this._router.navigate(['/signup']);
  }

  setCurrUser() {
    this._authService.fetchCurrUser().subscribe({
      next: (res) => {
        this._authService.setCurrUser(res.data);
      },
      error: () => {
        this._authService.clearCurrUser();
      },
    });
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitted.set(true);
    this.isLoading.set(true);
    const formData = this.loginForm.getRawValue();

    const loginPayload: IUserLogin = {
      email: formData.email!,
      password: formData.password!,
    };

    this._loginService
      .login(loginPayload)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: (res) => {
          this._snackbar.success(res.message);
          this.reset();
          this.setCurrUser();
          this._router.navigate(['/']);
        },
        error: (err: IErrorResponse) => {
          this._snackbar.error(err.message);
        },
      });
  }

  reset() {
    this.loginForm.reset();
    this.loginForm.markAsPristine();
    this.loginForm.markAsUntouched();
  }
}
