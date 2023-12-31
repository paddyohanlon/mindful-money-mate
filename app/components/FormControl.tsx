import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FormControl = ({ children }: Props) => {
  return <div className="form-control w-full pb-4">{children}</div>;
};

export default FormControl;
