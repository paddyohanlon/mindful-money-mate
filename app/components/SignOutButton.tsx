import { rid } from "../services/rethinkid";
import useAppStore from "../store";

const SignOutButton = () => {
  const { setIsLoggedIn } = useAppStore();

  function logOut() {
    rid.logOut();
    setIsLoggedIn(false);
  }

  return <button onClick={logOut}>Sign out</button>;
};

export default SignOutButton;
