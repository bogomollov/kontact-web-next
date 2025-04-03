"use client";

import { InputHTMLAttributes } from "react";

interface InputErrorProps extends InputHTMLAttributes<HTMLInputElement> {
  message?: string[] | string | undefined;
}

export default function InputError({
  className,
  message,
  ...props
}: InputErrorProps) {
  if (!message) return undefined;
  return (
    <small className={"text-red-500 " + className} {...props}>
      {message}
    </small>
  );
}
