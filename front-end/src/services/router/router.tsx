import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {ProductList} from "../../compounds/widgets/productList/ProductList";
import {Reviews} from "../../compounds/widgets/reviews/Reviews";

export const routes = {
    productList: '/',
    reviews: '/reviews'
};

export const Router = () => (
    <Routes>
        <Route path={routes.productList} element={<ProductList />} />
        <Route path={routes.reviews} element={<Reviews />} />

        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);