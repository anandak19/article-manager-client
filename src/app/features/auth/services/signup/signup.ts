import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOtpVerify, IUserEmail, IUserSignup } from '@features/auth/models/signup.model';
import { IBaseResponse, ISuccessResponse } from 'app/types/api-response.types';

export interface IOtpTime {
  timeLeft: number;
}

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private _http = inject(HttpClient);
  private API_ENDPOINT = 'auth/signup';

  verifyEmail(userData: IUserSignup) {
    return this._http.post<IBaseResponse>(`${this.API_ENDPOINT}/data`, userData);
  }

  getTimeLeft(emailData: IUserEmail) {
    return this._http.post<ISuccessResponse<IOtpTime>>(
      `${this.API_ENDPOINT}/varify/time`,
      emailData,
    );
  }

  resendOtp(emailData: IUserEmail) {
    return this._http.post<IBaseResponse>(
      `${this.API_ENDPOINT}/verify/resend`,
      emailData,
    );
  }

  validateOtp(otpData: IOtpVerify) {
    console.log(otpData)
    return this._http.post<IBaseResponse>(`${this.API_ENDPOINT}/verify`, otpData);
  }
}
