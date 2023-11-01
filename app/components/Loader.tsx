import { ReactNode } from "react";
import useAppStore from "../store";

interface Props {
  children: ReactNode;
}

const Loader = ({ children }: Props) => {
  const { isLoading, isLoggedIn } = useAppStore();
  return (
    <>
      {isLoading && isLoggedIn ? (
        <div className="text-center pt-6">
          <span
            className="loading loading-ring loading-lg"
            aria-label="Loading"
          ></span>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Loader;
