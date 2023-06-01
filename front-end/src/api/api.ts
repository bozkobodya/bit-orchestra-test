import {Review} from "../types";

export const getProducts = async () => {
    try {
        return await fetch('http://localhost:3001/products').then(data => data.json());
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getReviews = async () => {
    try {
        return await fetch('http://localhost:3001/reviews').then(data => data.json());
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const createReview = async (data: Partial<Review>) => {
    try {
        await fetch(
            'http://localhost:3001/reviews',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            }
        );
    } catch (error) {
        console.log(error);
    }
}