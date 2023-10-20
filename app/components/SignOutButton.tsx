import { useContext } from "react";
import IsLoggedInContext from "../contexts/isLoggedInContext";
import { rid } from "../services/rethinkid";

const SignOutButton = () => {
  function logOut() {
    rid.logOut();
    setIsLoggedIn(false);
  }
  const { setIsLoggedIn } = useContext(IsLoggedInContext);
  return <button onClick={logOut}>Sign out</button>;
};

export default SignOutButton;
