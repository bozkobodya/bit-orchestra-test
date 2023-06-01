import React, {FC, MouseEventHandler, useCallback, useState} from "react";
import {Input} from "../../shared/input/Input";
import {Textarea} from "../../shared/textarea/Textarea";
import {Checkbox} from "../../shared/checkbox/Checkbox";
import {validateEmail, validatePhoneNumber} from "../../../utils/validators";
import {createReview} from "../../../api/api";
import {generateInitialFormData, textareaMinRows, textConstants} from "./constants";
import styles from './CreateReviewForm.module.scss'
import classNames from "classnames";
import {Review} from "../../../types";
import {localStorageFormEmailKey, localStorageFormNameKey} from "../../../utils/constants";

type CreateReviewFormProps = {
    reFetchReviews: () => Promise<void>;
};

type Errors = {
    [key: string]: string;
};

export const CreateReviewForm: FC<CreateReviewFormProps> = ({ reFetchReviews }) => {
    const [formData, setFormData] = useState<Partial<Review>>(generateInitialFormData);
    const [errors, setErrors] = useState<Errors>({});
    const [saveFormInfoInBrowser, setSaveFormInfoInBrowser] = useState<boolean>(false);

    const toggleSaveForm = () => setSaveFormInfoInBrowser((prev) => !prev);

    const updateFormData = useCallback(
        (updatedData: Partial<Review>) => {
            setFormData({
                ...formData,
                ...updatedData
            });
        },
        [formData]
    );

    const generateErrors = useCallback(
        () => {
            const formErrors = {} as Errors;

            if (!formData.comment?.length) {
                formErrors.comment = 'Comment field is required';
            }

            if (!formData.name?.length) {
                formErrors.name = 'Name field is required';
            }

            if (!validateEmail(formData.email ?? '')) {
                formErrors.email = 'Email is invalid';
            }

            if (!!formData.phone?.length && !validatePhoneNumber(formData.phone)) {
                formErrors.phone = 'Phone is invalid';
            }

            return formErrors;
        },
        [formData]
    );

    const handleSubmitForm = useCallback<MouseEventHandler<HTMLFormElement>>(
        async (event) => {
            event.preventDefault();

            const formErrors = generateErrors();

            if (Object.keys(formErrors).length) {
                setErrors(formErrors);
                return;
            } else {
                setErrors({});
            }

            if (saveFormInfoInBrowser) {
                localStorage.setItem(localStorageFormNameKey, formData.name ?? '');
                localStorage.setItem(localStorageFormEmailKey, formData.email ?? '');
            }

            const date = new Date().toString();
            await createReview({
                ...formData,
                id: date,
                date
            });

            await reFetchReviews();

            setFormData(generateInitialFormData());
        },
        [formData, generateErrors, saveFormInfoInBrowser, reFetchReviews]
    );

    return (
        <div>
            <h2>{textConstants.title}</h2>
            <p>{textConstants.subTitle}</p>

            <form
                className="row g-3"
                onSubmit={handleSubmitForm}
            >
                <div className="col-12">
                    <Textarea
                        error={errors.comment}
                        minRows={textareaMinRows}
                        placeholder={textConstants.commentInputPlaceholder}
                        value={formData.comment}
                        onChange={(event) => updateFormData({ comment: event.target.value })}
                    />
                </div>

                <div className="col-12 col-md-6">
                    <Input
                        error={errors.name}
                        placeholder={textConstants.nameInputPlaceholder}
                        value={formData.name}
                        onChange={(event) => updateFormData({ name: event.target.value })}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <Input
                        error={errors.email}
                        placeholder={textConstants.emailItInputPlaceholder}
                        value={formData.email}
                        onChange={(event) => updateFormData({ email: event.target.value })}
                    />
                </div>

                <div className="col-12">
                    <Input
                        error={errors.phone}
                        placeholder={textConstants.phoneItInputPlaceholder}
                        value={formData.phone}
                        onChange={(event) => updateFormData({ phone: event.target.value })}
                    />
                </div>

                <div className="col-12">
                    <label className="d-flex gap-3 align-items-center">
                        <Checkbox
                            checked={saveFormInfoInBrowser}
                            onToggleCheckbox={toggleSaveForm}
                        />
                        {textConstants.saveFromDataInBrowser}
                    </label>
                </div>

                <div className="col-12">
                    <button
                        className={classNames(
                            'btn btn-primary submit-button',
                            styles.submit
                        )}
                        type="submit"
                    >
                        {textConstants.submit}
                    </button>
                </div>
            </form>
        </div>
    );
};