import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IPayload } from '@features/auth/models/login.model';
import { IBaseResponse, ISuccessResponse } from 'app/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private API_ENDPOINT = 'auth';

  currUser = signal<IPayload | null>(null);

  getCurrUser() {
    return this.currUser();
  }

  setCurrUser(user: IPayload) {
    this.currUser.set(user);
  }

  clearCurrUser() {
    this.currUser.set(null);
  }

  fetchCurrUser() {
    return this._http.get<ISuccessResponse<IPayload>>(`${this.API_ENDPOINT}/me`);
  }

  logoutUser() {
    return this._http.post<IBaseResponse>(`${this.API_ENDPOINT}/logout`, {});
  }
}
