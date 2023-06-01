export type Product = {
    id: string;
    imageURL: string;
    name: string;
    price: number;
    producer: string;
    isAvailable: boolean;
};

export type Review = {
    id: string;
    name: string;
    date: string;
    mark?: number;
    phone?: string;
    email: string;
    comment: string;
};