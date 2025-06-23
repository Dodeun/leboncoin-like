// BACK TO FRONT
export type User = {
    id: number;
    email: string;
    name: string;
    city: string;
    phone?: string;
    created_at: Date;
};

export type UserWithPassword = User & {
    password: string;
};

// FRONT TO BACK
export type UserPayload = {
    email: string;
    password: string;
    name: string;
    city: string;
    phone?: string;
};
