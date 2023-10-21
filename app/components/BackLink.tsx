import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
}

const BackLink = ({ children, href }: Props) => {
  return (
    <Link className="link link-secondary" href={href}>
      &larr; {children}
    </Link>
  );
};

export default BackLink;
