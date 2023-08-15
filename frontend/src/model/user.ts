export interface User {
  id?: string;
  username: string;
  password: string;
}

export interface UserLoginResponse {
  token: string;
}
