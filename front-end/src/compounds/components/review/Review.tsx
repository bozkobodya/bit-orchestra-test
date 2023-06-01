import React, {FC, useCallback, useMemo, useState} from "react";
import { ReactComponent as Star } from '../../../assets/images/star.svg';
import {getMonthName} from "../../../utils/date";
import styles from './Review.module.scss';
import {textConstants} from "./constants";
import { Review as ReviewElements } from '../../../types/index';
import classNames from "classnames";

export const Review: FC<ReviewElements> = ({ comment, mark, date, name }) => {

    const [allTextVisible, setAllTextVisible] = useState(false);
    const [isOverflown, setIsOverflown] = useState(false);

    const onRefChange = useCallback((node: any) => {
        if (node !== null) {
            const { scrollHeight, clientHeight, scrollWidth, clientWidth } = node;

            const result =  scrollHeight > clientHeight || scrollWidth > clientWidth;

            setIsOverflown(result)

        }
    }, []);

    const dateString = useMemo(() => {
            const dateObject = new Date(date);

            return `${getMonthName(dateObject)} ${dateObject.getDate()}, ${dateObject.getFullYear()}`
        },
        [date]
    );

    return (
        <div className={styles.wrapper}>
            <h3>{name}</h3>

            <div className={styles.date}>{dateString}</div>

            {typeof mark !== 'undefined' && (
                <div className={`d-flex ${styles.stars}`}>
                    {Array(5)
                        .fill(undefined)
                        .map(
                            (_, index) => (
                                <Star
                                    key={index}
                                    fill={!!mark && mark >= index + 1 ? '#446671' : 'none'}
                                />
                            )
                        )}
                </div>
            )}

            <div
                ref={onRefChange}
                className={classNames(
                    styles.comment,
                    allTextVisible ? styles.commentOpened : styles.commentClosed
                )}
            >
                {comment}
            </div>

            {!allTextVisible && isOverflown && (
                <button
                    className={classNames(
                        'border border-dark border-1 border-start-0 border-end-0 border-top-0 fw-bold',
                        styles.readMore
                    )}
                    onClick={() => setAllTextVisible(true)}
                >
                    {textConstants.readMore}
                </button>
            )}
        </div>
    )
}