import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FormControl = ({ children }: Props) => {
  return <div className="form-control w-full max-w-xs">{children}</div>;
};

export default FormControl;
