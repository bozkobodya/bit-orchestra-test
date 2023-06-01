import React, { useState } from "react";
import classNames from "classnames";
import styles from './Reviews.module.scss';
import {CreateReviewForm} from "../../components/createReviewForm/CreateReviewForm";
import {review} from "../../../../mock-tool/reviews";
import {ReviewList} from "../../components/reviewList/ReviewList";
import {getReviews} from "../../../api/api";
import {Review} from "../../../types";

export const Reviews = () => {

    const [reviews, setReviews] = useState<Review[]>([review]);

    const fetchReviews = async () => {
        const dbReviews = await getReviews();
        setReviews(dbReviews);
    };

    return (
        <div
            className={classNames(
                'd-flex flex-column',
                styles.wrapper
            )}
        >
            <ReviewList reviewList={reviews} />

            <CreateReviewForm reFetchReviews={fetchReviews} />
        </div>
    );
};