"use client";
import React from "react";

interface Props {
  error: Error;
}

const ErrorPage = ({ error }: Props) => {
  console.log("Error", error);
  return <div>An unexpected error has occurred.</div>;
};

export default ErrorPage;
