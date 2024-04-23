import { bzr } from "../services/bzr";

const SignInButton = () => {
  return <button onClick={() => bzr.login()}>Sign in</button>;
};

export default SignInButton;
