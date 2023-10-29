import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ContainerSmall = ({ children }: Props) => {
  return <div className="prose max-w-sm mx-auto pt-12">{children}</div>;
};
