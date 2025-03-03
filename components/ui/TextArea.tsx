'use client'

import { TextareaHTMLAttributes } from "react";

export default function TextArea({ id, name, className, placeholder, minLength, maxLength, rows, cols, required, defaultValue, onChange, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {

    return (
        <textarea
            id={id}
            name={name}
            rows={rows}
            cols={cols}
            minLength={minLength}
            maxLength={maxLength}
            className={className}
            placeholder={placeholder}
            required={required}
            defaultValue={defaultValue}
            onChange={onChange}
            {...props}
        />
    );
}