export type Ad = {
    id: number;
    title: string;
    description: string;
    price: number;
    created_at: Date;
    updated_at?: Date;
    user_id: number;
    category_id: number;
};
