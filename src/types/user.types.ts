export interface NewUserPayload {
  name: string;
  email: string;
  password: string;
  city: string;
  phone_number?: string;
}

export interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
  city: string;
  phone_number?: string;
}
