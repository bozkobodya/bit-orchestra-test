import React, {useEffect, useState} from 'react';
import styles from './ProductList.module.scss';
import {Card} from "../../components/card/Card";
import {getProducts} from "../../../api/api";
import classNames from "classnames";
import {textConstants} from "./constants";
import {Product} from "../../../types";

export const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        const productsList = await getProducts();
        setProducts(productsList);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div
            className={classNames(
                'bg-white px-2 text-center min-vh-100',
                styles.wrapper
            )}
        >
            <h6>{textConstants.subtitle}</h6>

            <h1
                className={classNames(
                    'my-4',
                    styles.start
                )}
            >
                {textConstants.title}
            </h1>

            <div className="row gx-0">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="col-12 col-sm-6 col-lg-4 col-xl-3"
                    >
                        <Card {...product} />
                    </div>
                ))}
            </div>
        </div>
    );
};