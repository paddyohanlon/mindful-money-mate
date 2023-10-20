import { useContext, useEffect } from "react";
import { rid } from "../services/rethinkid";
import IsLoggedInContext from "../contexts/isLoggedInContext";

const HandleOnLogin = () => {
  const { setIsLoggedIn } = useContext(IsLoggedInContext);

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

  return null;
};

export default HandleOnLogin;
