"use client";
import { InputHTMLAttributes, Ref, forwardRef } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: Ref<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type,
      className,
      placeholder,
      required,
      defaultValue,
      onChange,
      inputRef,
      ...props
    },
    ref,
  ) => {
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
        ref={inputRef || ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
