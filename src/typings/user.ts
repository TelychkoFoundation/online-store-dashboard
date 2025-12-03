export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  age: number;
  gender: 'male' | 'female';
  image: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface UserFormPayload {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  age: number;
  gender: 'male' | 'female';
}

export interface UpdateUserPayload extends UserFormPayload {
  id: number;
}
