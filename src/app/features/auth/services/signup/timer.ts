import { inject, Injectable, signal } from '@angular/core';
import { SignupService } from './signup';
import { ISuccessResponse } from 'app/types/api-response.types';
import { IUserEmail } from '@features/auth/models/signup.model';

@Injectable({
  providedIn: 'root',
})
export class Timer {
  private _signupService = inject(SignupService);
  private _intervalId!: ReturnType<typeof setInterval>;
  timer = signal(0);

  setTimer(userEmail: IUserEmail) {
    this._signupService.getTimeLeft(userEmail).subscribe({
      next: (res) => {
        this.timer.set(res.data.timeLeft);
        // if intervel is running, clear it
        if (this._intervalId) {
          clearInterval(this._intervalId);
        }

        // in each second, reduce the time left by 1s: if time left is greater than 0 (time is left)
        this._intervalId = setInterval(() => {
          if (this.timer() > 0) {
            this.timer.update((val) => val - 1);
          } else {
            clearInterval(this._intervalId);
          }
        }, 1000);
      },
    });
  }
}
