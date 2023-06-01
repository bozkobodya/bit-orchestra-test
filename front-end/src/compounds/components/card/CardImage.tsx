import React, {FC} from 'react';
import styles from "./Card.module.scss";
import classNames from "classnames";
import {ReactComponent as Heart} from "../../../assets/images/heart.svg";
import {textConstants} from "./constants";
import {localStorageLikedItemsKey} from "../../../utils/constants";
import {useLocalStorageIncludesArray} from "../../../hooks/useLocalStorageIncludesArray";

type CardImageProps = {
    imgSrc: string;
    itemId: string;
};

export const CardImage: FC<CardImageProps> = ({ imgSrc, itemId }) => {

    const [isLiked, handleToggleLike] = useLocalStorageIncludesArray(localStorageLikedItemsKey, itemId);

    return (
        <div className="position-relative">
            <div className={styles.label}>
                {textConstants.imageLabel}
            </div>
            <button
                className={classNames(
                    'position-absolute bg-transparent border-0 p-0',
                    styles.heart,
                )}
                onClick={handleToggleLike}
            >
                <Heart
                    fill={isLiked ? 'red' : 'none'}
                    stroke={isLiked ? 'red' : 'white'}
                />
            </button>

            <img
                alt="card-image"
                src={imgSrc}
                className={classNames(
                    'card-img-top rounded-0',
                    styles.image
                )}
            />

            <button
                className={classNames(
                    'position-absolute bg-transparent p-0',
                    styles.details,
                )}
            >
                {textConstants.productDetails}
            </button>
        </div>
    );
};