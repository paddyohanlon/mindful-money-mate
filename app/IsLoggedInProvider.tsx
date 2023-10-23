import React, { ReactNode, useEffect, useState } from "react";
import IsLoggedInContext from "./contexts/isLoggedInContext";
import { rid } from "./services/rethinkid";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

const IsLoggedInProvider = ({ children }: Props) => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function handleOnLogin() {
      setIsLoggedIn(true);
    }

    if (rid.isLoggedIn()) {
      handleOnLogin();
    } else {
      router.push("/");
    }

    rid.onLogin(async () => {
      handleOnLogin();
    });
  }, [setIsLoggedIn, router]);
  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </IsLoggedInContext.Provider>
  );
};

export default IsLoggedInProvider;
