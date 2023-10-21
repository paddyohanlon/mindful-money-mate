import React, { ReactNode, useEffect, useState } from "react";
import IsLoggedInContext from "./contexts/isLoggedInContext";
import { rid } from "./services/rethinkid";

interface Props {
  children: ReactNode;
}

const IsLoggedInProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function handleOnLogin() {
      setIsLoggedIn(true);
    }

    if (rid.isLoggedIn()) {
      handleOnLogin();
    }

    rid.onLogin(async () => {
      handleOnLogin();
    });
  }, [setIsLoggedIn]);
  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </IsLoggedInContext.Provider>
  );
};

export default IsLoggedInProvider;
