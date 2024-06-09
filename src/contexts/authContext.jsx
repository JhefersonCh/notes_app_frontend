import { createContext, useState } from "react";
import authService from "../Modules/shared/services/authService";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser());

  const setAuthentication = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};
