export interface User {
  userId: number;
  name: string;
  surname: string;
  email: string;
  admin: boolean;
  password: string;
}

export interface CreateUser {
  name: string;
  surname: string;
  email: string;
  admin: boolean;
  password: string;
}
