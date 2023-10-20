import { createContext } from "react";

interface ContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const IsLoggedInContext = createContext<ContextType>({} as ContextType);

export default IsLoggedInContext;
