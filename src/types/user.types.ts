export interface NewUserPayload {
    name: string;
    email: string;
    password: string;
    city: string;
    phone_number?: string;
}

export interface NewUser {
    name: string;
    email: string;
    hashedPassword: string;
    city: string;
    phone_number?: string;
}

export interface User {
    user_id: number;
    name: string;
    email: string;
    hashedPassword: string;
    city: string;
    phone_number?: string;
}

export interface UserLoginPayload {
    email: string;
    password: string;
}
