export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

export type Review = {
    id: string;
    user_id: string;
    product_id: string;
    rating: number;
    comment: string;
    created_at: Date;
  };