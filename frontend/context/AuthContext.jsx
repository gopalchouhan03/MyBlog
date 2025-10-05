import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize auth from localStorage
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Sync localStorage whenever user or isAuth changes
  useEffect(() => {
    if (isAuth && user) {
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [isAuth, user]);

  // Logout helper
  const logout = () => {
    setIsAuth(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
