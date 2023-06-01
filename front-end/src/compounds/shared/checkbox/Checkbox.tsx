import React, {  FC } from 'react';
import styles from './Checkbox.module.scss';
import classNames from "classnames";

type CheckboxProps = {
    checked: boolean;
    onToggleCheckbox: () => void;
};

export const Checkbox: FC<CheckboxProps> = ({ checked, onToggleCheckbox }) => {
    return (
        <label
            className={classNames(
                'bg-white d-flex justify-content-center align-items-center',
                styles.checkbox
            )}
        >
            {checked && (
                <div
                    className={classNames(
                        'position-relative border border-dark border-3 border-top-0 border-end-0',
                        styles.checkmark
                    )}
                />
            )}

            <input
                checked={checked}
                type="checkbox"
                className="d-none"
                onChange={onToggleCheckbox}
            />
        </label>
    );
};