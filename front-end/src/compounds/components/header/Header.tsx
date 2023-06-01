import React from 'react';
import {Link} from "react-router-dom";
import styles from './Header.module.scss';
import classNames from "classnames";
import {textConstants} from "./constants";
import {routes} from "../../../services/router/router";

const Header = () => {
    return (
        <header className={classNames('bg-primary position-fixed w-100 top-0', styles.header)}>
            <div
                className={classNames(
                    'container d-flex p-3 text-white fs-5',
                    styles.wrapper
                )}>

                <Link
                    className="text-light fw-normal text-decoration-none"
                    to={routes.productList}
                >
                    {textConstants.productList}
                </Link>

                <Link
                    className="text-light fw-normal text-decoration-none"
                    to={routes.reviews}
                >
                    {textConstants.reviews}
                </Link>
            </div>
        </header>
    );
};

export default Header;