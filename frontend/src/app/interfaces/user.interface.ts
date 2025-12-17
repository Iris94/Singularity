export interface User {
  _id?: string;
  id?: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profession?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  profession?: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginRequest {
  username?: string;
  email?: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}
