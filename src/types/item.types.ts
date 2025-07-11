// BACK TO FRONT
export type Item = {
    item_id: number;
    titre: string;
    description: string;
    price: number;
    created_at: Date;
    updated_at?: Date;
    user_id: number;
    category_id: number;
};

// FRONT TO BACK
export type ItemPayload = {
    titre: string;
    description: string;
    price: number;
    user_id: number;
    category_id: number;
};

export type ItemUpdatePayload = Partial<ItemPayload>;
