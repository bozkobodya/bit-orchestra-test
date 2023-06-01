import React, {FC} from 'react';
import styles from './Card.module.scss';
import classNames from "classnames";
import {Checkbox} from "../../shared/checkbox/Checkbox";
import {CardImage} from "./CardImage";
import {textConstants} from "./constants";
import {Product} from "../../../types";
import {localStorageCompareItemsKey} from "../../../utils/constants";
import {useLocalStorageIncludesArray} from "../../../hooks/useLocalStorageIncludesArray";

export const Card: FC<Product> = ({
    id,
    imageURL,
    name,
    price,
    producer,
    isAvailable
}) => {
    const [isCompared, handleToggleCompare] = useLocalStorageIncludesArray(localStorageCompareItemsKey, id);

    return (
        <div
            className={classNames(
                'card rounded-0 p-2',
                styles.card
            )}
        >
            <CardImage imgSrc={imageURL} itemId={id} />

            <div className="card-body p-1">
                <h5 className="card-title p-0 d-flex justify-content-between">
                    {name}
                    <span>${price}</span>
                </h5>

                <h6 className="card-subtitle mb-2 text-muted fw-normal text-start">
                    {producer}
                </h6>

                <div className="d-flex align-items-center justify-content-between card-text">
                    <div
                        className={classNames(
                            'd-flex align-items-center',
                            styles.available
                        )}
                    >
                        <div
                            className={classNames(
                                'border border-1 rounded-circle',
                                isAvailable ? 'border-success' : 'border-danger',
                                styles.radio
                            )}
                        >
                            <div
                                className={classNames(
                                    'w-100 h-100 border border-2 rounded-circle border-white',
                                    isAvailable ? 'bg-success' : 'bg-danger'
                                )}
                            />
                        </div>
                        {isAvailable ? textConstants.itemAvailable : textConstants.itemNotAvailable}
                    </div>
                    <div
                        className={classNames(
                        'd-flex align-items-center',
                        styles.compare
                    )}
                    >
                        {textConstants.compare}
                        <Checkbox checked={isCompared} onToggleCheckbox={handleToggleCompare} />
                    </div>
                </div>
            </div>
        </div>
    );
};