import React, { ReactNode, useState } from "react";
import IsLoggedInContext from "./contexts/isLoggedInContext";

interface Props {
  children: ReactNode;
}

const IsLoggedInProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </IsLoggedInContext.Provider>
  );
};

export default IsLoggedInProvider;
