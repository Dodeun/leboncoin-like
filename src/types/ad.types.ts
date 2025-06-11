export interface NewAdInput {
    title: string;
    description: string;
    price: number;
    user_id: number;
    category_id: number
}

export interface Ad extends NewAdInput {
    ad_id: number;
    created_at: Date;
    updated_at?: Date;
};
