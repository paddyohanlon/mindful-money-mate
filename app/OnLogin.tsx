import { useEffect } from "react";
import { bzr } from "./services/bzr";
import useAppStore from "./store";

const OnLogin = () => {
  const load = useAppStore((state) => state.load);
  const setIsLoggedIn = useAppStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    const onLogin = () => {
      setIsLoggedIn(true);
      load();
    };

    if (bzr.isLoggedIn()) {
      onLogin();
    } else {
      bzr.onLogin(async () => {
        onLogin();
      });
    }
  }, [load, setIsLoggedIn]);

  return null;
};

export default OnLogin;
