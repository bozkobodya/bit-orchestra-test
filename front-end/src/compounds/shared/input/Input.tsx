import React, {ComponentProps, FC} from 'react';
import classNames from "classnames";
import styles from './Input.module.scss';

type InputProps = ComponentProps<'input'> & {
    error?: string;
};

export const Input: FC<InputProps> = ({
    error,
    ...inputProps
}) => (
    <div className="w-100">
        <input
            {...inputProps}
            className={classNames(
                'w-100 form-control bg-white rounded-0',
                styles.input,
                inputProps.className,
                { 'is-invalid': !!error?.length }
            )}
            type={inputProps.type ?? 'text'}
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