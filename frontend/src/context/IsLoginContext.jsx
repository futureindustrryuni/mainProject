import { createContext, useState } from "react";

export const IsLoginContext = createContext();

export function IsLoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <IsLoginContext.Provider value={isLogin}>
      {children}
    </IsLoginContext.Provider>
  );
}
