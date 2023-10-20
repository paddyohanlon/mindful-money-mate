import { rid } from "../services/rethinkid";

const SignInButton = () => {
  return <button onClick={() => rid.login()}>Sign in Button</button>;
};

export default SignInButton;
