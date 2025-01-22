export interface Address {
  $id?: string;
  street: string;
  postalCode: string;
  city: string;
  country?: string;
}

export interface User {
  $id?: string;
  username: string;
  email: string;
}

export interface Company {
  $id?: string;
  logo: string;
  name: string;
  description: string;
  dealValue: number;
  addresses: string[] | Address[];
  users: string[] | User;
  version: number;
}
