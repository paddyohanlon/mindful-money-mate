import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Alert = ({ children }: Props) => {
  return (
    <div
      className="bg-red-500 text-red-900 px-4 py-1 mb-1 rounded-full"
      role="alert"
    >
      {children}
    </div>
  );
};

export default Alert;
