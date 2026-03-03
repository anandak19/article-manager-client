import { Component, DestroyRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  emailValidator,
  nameValidator,
  noWhitespaceValidator,
  passwordMatchValidator,
  passwordValidator,
} from '@shared/validators/forms.validators';
import { LoadingButton } from '@shared/components/ui/loading-button/loading-button';
import { IOtpVerify, IUserEmail, IUserSignup } from '@features/auth/models/signup.model';
import { SignupService } from '@features/auth/services/signup/signup';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IErrorResponse } from 'app/types/api-response.types';
import { finalize } from 'rxjs';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { Timer } from '@features/auth/services/signup/timer';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatError,
    LoadingButton,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  private _formBuilder = inject(FormBuilder);
  private _signupService = inject(SignupService);
  private _destroyRef = inject(DestroyRef);
  private _snackbarService = inject(SnackbarService);
  private _timerService = inject(Timer);
  private _router = inject(Router);

  isSignupSubmitted = signal(false);
  isSignupLoading = signal(false);
  isOtpFormSubmitted = signal(false);
  isOtpFormLoading = signal(false);
  isOtpResendLoading = signal(false);

  // variables
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  userDetailsForm!: FormGroup;
  otpForm!: FormGroup;

  userEmail = signal<IUserEmail>({} as IUserEmail);

  timeLeft = this._timerService.timer;

  onUserDetailsFormSubmit() {
    if (this.userDetailsForm.valid) {
      this.isSignupLoading.set(true);
      this.isSignupSubmitted.set(true);

      const formValues = this.userDetailsForm.getRawValue();
      const userData: IUserSignup = {
        firstName: formValues.firstName!,
        lastName: formValues.lastName!,
        email: formValues.email!,
        password: formValues.passwords.confirmPassword!,
      };

      this._signupService
        .verifyEmail(userData)
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => this.isSignupLoading.set(false)),
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            this.userEmail.update((curr) => ({ ...curr, email: userData.email }));
            this._snackbarService.success(res.message);

            this._timerService.setTimer(this.userEmail());
            this.stepper.next();
          },
          error: (err: IErrorResponse) => {
            console.log(err);
            this._snackbarService.error(err.message);
          },
        });
    } else {
      this.userDetailsForm.markAllAsTouched();
    }
  }

  onOtpFormSubmit() {
    if (this.otpForm.valid) {
      this.isOtpFormSubmitted.set(true);
      this.isOtpFormLoading.set(true);

      const otpFormData = this.otpForm.getRawValue();

      const otpData: IOtpVerify = {
        email: this.userEmail().email,
        otp: String(otpFormData.otp),
      };

      this._signupService
        .validateOtp(otpData)
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => this.isOtpFormLoading.set(false)),
        )
        .subscribe({
          next: (res) => {
            this._snackbarService.success(res.message);
            this.otpForm.reset();
            this._router.navigate(['/login']);
          },
          error: (err: IErrorResponse) => {
            this._snackbarService.error(err.message);
          },
        });
    } else {
      this.otpForm.markAllAsTouched();
    }
  }

  // error getter
  getUserDataFormError(controlName: string) {
    const control = this.userDetailsForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;

    return this.errorMessage(errors);
  }

  // error getter
  getPasswordErrors(controlName: string) {
    const control = this.userDetailsForm.get('passwords')?.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;

    return this.errorMessage(errors);
  }

  // error getter
  passwordMatchError() {
    const control = this.userDetailsForm.get('passwords');
    if (!control || !control.errors || !control.touched) return '';

    const errors = control?.errors;
    return this.errorMessage(errors);
  }

  getOtpError() {
    const control = this.otpForm.get('otp');
    if (!control || !control.errors || !control.touched) return '';
    const errors = control.errors;
    return this.errorMessage(errors);
  }

  errorMessage(errors: ValidationErrors) {
    if (errors['required']) return 'This field is required';

    if (errors['minlength'])
      return `Minimum ${errors['minlength'].requiredLength} characters required`;

    if (errors['maxLength'])
      return `Maximum ${errors['maxLength'].requiredLength} characters required`;

    if (errors['customError']) return errors['customError'];

    return 'Invalid field';
  }

  resend() {
    if (this.timeLeft() > 0) return;
    this.isOtpResendLoading.set(true);
    this._signupService
      .resendOtp(this.userEmail())
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isOtpResendLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this.otpForm.reset();
          this._snackbarService.success(res.message);
          this._timerService.setTimer(this.userEmail());
        },
        error: (err: IErrorResponse) => {
          this._snackbarService.error(err.message);
        },
      });
  }

  goBack() {
    this.stepper.previous();
  }

  initUserDetailsForm() {
    this.userDetailsForm = this._formBuilder.group({
      firstName: ['', [Validators.required, nameValidator, noWhitespaceValidator]],
      lastName: ['', [Validators.required, nameValidator, noWhitespaceValidator]],
      email: ['', [Validators.required, emailValidator, noWhitespaceValidator]],
      passwords: this._formBuilder.group(
        {
          password: ['', [Validators.required, Validators.minLength(5), passwordValidator]],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: passwordMatchValidator },
      ),
    });
  }

  initOtpForm() {
    this.otpForm = this._formBuilder.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
  }

  navigateLogin() {
    this._router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.initUserDetailsForm();
    this.initOtpForm();
  }
}
