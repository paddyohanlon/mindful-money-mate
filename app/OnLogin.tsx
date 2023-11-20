import { useEffect } from "react";
import { rid } from "./services/rethinkid";
import useAppStore from "./store";

const OnLogin = () => {
  const load = useAppStore((state) => state.load);
  const setIsLoggedIn = useAppStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    const onLogin = () => {
      setIsLoggedIn(true);
      load();
    };

    if (rid.isLoggedIn()) {
      onLogin();
    } else {
      rid.onLogin(async () => {
        onLogin();
      });
    }
  }, [load, setIsLoggedIn]);

  return null;
};

export default OnLogin;
