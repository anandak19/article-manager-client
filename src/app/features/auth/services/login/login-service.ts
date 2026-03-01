import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserLogin } from '@features/auth/models/login.model';
import { IBaseResponse } from 'app/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _http = inject(HttpClient);
  private API_ENDPOINT = 'auth/login';

  login(data: IUserLogin) {
    return this._http.post<IBaseResponse>(`${this.API_ENDPOINT}`, data);
  }
}
