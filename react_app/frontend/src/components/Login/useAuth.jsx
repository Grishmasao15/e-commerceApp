import { ReactElement, createContext, useContext, useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { newValueInterface } from "./useLocalStorage";
import * as React from 'react';


// export type CreateContextType {
//   login: Promise<void>
//   logout: Promise<void>
//   user: newValueInterface
// }

// export type TodoContextType = {
//   user: { user: newValueInterface }
//   login: (data: newValueInterface) => void;
//   logout: () => void;
// };

// interface Contexttype {
//   user: newValueInterface | null;
//   setUser: (data: newValueInterface | null) => void;
// }

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log(typeof children, "Authprovider childrennnnn");
  const [user, setUser] = useLocalStorage("user", null);

  console.log(user, "userrrrrrrrrrrrrr");
  console.log([user, setUser]);

  const navigate = useNavigate();
  const location = useLocation();

  // call this function when you want to authenticate the user
  const login = (data) => {
    setUser(data);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};