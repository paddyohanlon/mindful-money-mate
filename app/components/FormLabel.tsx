import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  htmlFor: string;
  className?: string;
}

const FormLabel = ({ children, htmlFor, className = "" }: Props) => {
  return (
    <label className={`label ${className}`} htmlFor={htmlFor}>
      <span className="label-text">{children}</span>
    </label>
  );
};

export default FormLabel;
