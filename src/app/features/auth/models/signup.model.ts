export interface IUserEmail {
  email: string;
}

export interface IUserSignup extends IUserEmail {
  firstName: string;
  lastName: string;
  password: string;
}

export interface IOtpVerify extends IUserEmail {
  otp: string;
}
