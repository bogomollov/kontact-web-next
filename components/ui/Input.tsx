'use client'

import { InputHTMLAttributes } from "react";

export default function Input({ id, name, type, className, placeholder, required, defaultValue, onChange, ...props }: InputHTMLAttributes<HTMLInputElement>) {

    return (
        <input
            id={id}
            name={name}
            type={type}
            className={className}
            placeholder={placeholder}
            required={required}
            defaultValue={defaultValue}
            onChange={onChange}
        />
    );
}