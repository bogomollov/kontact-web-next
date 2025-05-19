"use client";
import { SelectHTMLAttributes, Ref, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  selectRef?: Ref<HTMLSelectElement>;
  options: { value: string | number; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      className = "",
      required,
      value,
      defaultValue,
      onChange,
      options,
      selectRef,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex w-full rounded-[10px] border px-[14px] py-[10px] focus:outline-blue-500";

    return (
      <select
        id={id}
        name={name}
        className={`${baseClasses} ${className}`}
        required={required}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        ref={selectRef || ref}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  },
);

Select.displayName = "Select";

export default Select;
