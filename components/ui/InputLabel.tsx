"use client";

import { LabelHTMLAttributes } from "react";

export default function InputLabel({
  htmlFor,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label htmlFor={htmlFor} className="text-neutral-950" {...props}>
      {children}
    </label>
  );
}
