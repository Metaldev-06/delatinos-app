export interface LoginResponse {
  token: string;
  customer: Customer;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginData {
  email: string;
  password: string;
}
