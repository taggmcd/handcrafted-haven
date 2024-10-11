// src/types.ts

export interface Product {
    id?: number; // Assuming products might have an ID
    name: string;
    description: string;
}

export interface SellerProfile {
    //id: number; // Assuming profiles have an ID
    name: string;
    description: string;
    story: string;
    products: Product[];
}


