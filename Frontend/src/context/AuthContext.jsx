import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  signupUser,
} from "../services/authService";


export const AuthContext = createContext(null);


export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const restoreSession = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {

        const response =await getCurrentUser();
        setUser(response.data);

      } catch (error) {

        localStorage.removeItem("token");
        setUser(null);

      } finally {

        setLoading(false);
      }
    };


    restoreSession();

  }, []);


  const signup = async (
    userData
  ) => {

    const response = await signupUser(userData);
    const authData = response.data;
    localStorage.setItem(
      "token",
      authData.token
    );

    setUser(authData);
    return authData;
  };


  const login = async (
    credentials
  ) => {

    const response =
      await loginUser(credentials);

    const authData = response.data;

    localStorage.setItem(
      "token",
      authData.token
    );

    setUser(authData);

    return authData;
  };


  const logout = async () => {

    try {

      await logoutUser();

    } finally {

      localStorage.removeItem("token");

      setUser(null);
    }
  };


  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    signup,
    login,
    logout,
    setUser,
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};