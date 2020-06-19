export interface User {
  userId: number;
  name: string;
  surname: string;
  email: string;
  isAdmin: boolean;
  password: string;
}

export interface CreateUser {
  name: string;
  surname: string;
  email: string;
  isAdmin: boolean;
  password: string;
}
