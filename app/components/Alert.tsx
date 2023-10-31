import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Alert = ({ children, className = "" }: Props) => {
  return (
    <div
      className={`bg-red-300 text-red-900 px-4 py-1 mb-1 rounded-full ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
};

export default Alert;
