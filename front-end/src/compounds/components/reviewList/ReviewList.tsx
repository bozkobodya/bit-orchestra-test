import React, {FC, useMemo, useState} from "react";
import {Review} from "../review/Review";
import { Review as ReviewElements } from "../../../types/index";
import styles from './ReviewList.module.scss';
import {textConstants} from "./constants";
import classNames from "classnames";

type ReviewListProps = {
    reviewList: ReviewElements[];
};

export const ReviewList: FC<ReviewListProps> = ({ reviewList }) => {
    const [showAllReviews, setShowAllReviews] = useState<boolean>(false);

    const visibleReviews = useMemo(
        () => {
            const sortedReviews = reviewList.sort(
                (firstReview, secondReview) =>
                    new Date(secondReview.date).getTime() - new Date(firstReview.date).getTime()
            );

            if (showAllReviews) {
                return sortedReviews;
            }

            return sortedReviews.filter((_, index) => !index);
        },
        [reviewList, showAllReviews]
    );

    return (
        <div>
            {visibleReviews.map(review => (
                <Review
                    {...review}
                    key={review.id}
                />
            ))}

            {!showAllReviews && reviewList.length > 1 && (
                <button
                    className={classNames(
                        'border border-dark border-1 border-start-0 border-end-0 border-top-0 fw-bold',
                        styles.readAll
                    )}
                    onClick={() => setShowAllReviews(true)}
                >
                    {textConstants.readAllReviews}
                </button>
            )}
        </div>
    );
};