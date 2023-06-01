import React, { FC } from 'react';
import classNames from "classnames";
import TextareaAutosize, {TextareaAutosizeProps} from 'react-textarea-autosize';
import styles from './Textarea.module.scss';

type TextareaProps = TextareaAutosizeProps & {
    error?: string;
};

export const Textarea: FC<TextareaProps> = ({
    error,
    ...textareaProps
}) => (
    <div className="w-100">
        <TextareaAutosize
            {...textareaProps}
            className={classNames(
                'w-100 p-2 form-control bg-white rounded-0',
                styles.textarea,
                textareaProps.className,
                { 'is-invalid': !!error?.length }
            )}
        />

        {!!error?.length && (
            <span
                className="invalid-feedback"
            >
                {error}
            </span>
        )}
    </div>
);