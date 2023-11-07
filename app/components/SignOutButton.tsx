import { rid } from "../services/rethinkid";
import useAppStore from "../store";

const SignOutButton = () => {
  const setIsLoggedIn = useAppStore((state) => state.setIsLoggedIn);

  function logOut() {
    rid.logOut();
    setIsLoggedIn(false);
  }

  return <button onClick={logOut}>Sign out</button>;
};

export default SignOutButton;
