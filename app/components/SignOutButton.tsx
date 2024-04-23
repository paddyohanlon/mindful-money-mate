import { bzr } from "../services/bzr";
import useAppStore from "../store";

const SignOutButton = () => {
  const setIsLoggedIn = useAppStore((state) => state.setIsLoggedIn);

  function logOut() {
    bzr.logOut();
    setIsLoggedIn(false);
  }

  return <button onClick={logOut}>Sign out</button>;
};

export default SignOutButton;
