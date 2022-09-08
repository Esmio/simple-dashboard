export interface SignupParams {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
}

export interface LoginResponse {
  code: number;
  data: LoginResponseData;
  msg: string;
}
