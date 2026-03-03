import { IUserEmail, IUserSignup } from './signup.model';

export interface IUserLogin extends IUserEmail {
  password: string;
}

export interface IPayload extends Pick<IUserSignup, 'email' | 'firstName'> {
  id: string;
}
