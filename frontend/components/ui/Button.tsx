"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { IconType } from "react-icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: IconType;
}

export default function Button({
  type = "button",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={
        "inline-flex items-center justify-center px-4 py-2 " + `${className} `
      }
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
