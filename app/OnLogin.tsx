import { useEffect } from "react";
import { rid } from "./services/rethinkid";
import useAppStore from "./store";

const OnLogin = () => {
  const { load, setIsLoggedIn } = useAppStore();

  useEffect(() => {
    const onLogin = () => {
      setIsLoggedIn(true);
      load();
    };

    if (rid.isLoggedIn()) {
      console.log("already logged in");
      onLogin();
    } else {
      console.log("set onLogin callback");
      rid.onLogin(async () => {
        onLogin();
      });
    }
  }, [load, setIsLoggedIn]);

  return null;
};

export default OnLogin;
