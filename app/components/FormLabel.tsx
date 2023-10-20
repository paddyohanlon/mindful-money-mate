import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  htmlFor: string;
}

const FormLabel = ({ children, htmlFor }: Props) => {
  return (
    <label className="label" htmlFor={htmlFor}>
      <span className="label-text">{children}</span>
    </label>
  );
};

export default FormLabel;
