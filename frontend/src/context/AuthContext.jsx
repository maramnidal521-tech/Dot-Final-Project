"use client";

import { createContext, useContext, useEffect, useState } from "react";
<<<<<<< HEAD
import { loginUser, logoutUser } from "../services/authService";

const AuthContext = createContext(null);

=======
import { loginUser, logoutUser, registerUser } from "../services/authService";

const AuthContext = createContext(null);

const getSavedUser = () => {
  const rawUser = localStorage.getItem("user");

  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

const persistSession = (token, user) => {
  if (token) localStorage.setItem("accessToken", token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
};

>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
    const savedToken = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken) setAccessToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      setAccessToken(data.accessToken);
      setUser(data.user);
=======
    const token = localStorage.getItem("accessToken");
    const savedUser = getSavedUser();

    setAccessToken(token);
    setUser(savedUser);
    setLoading(false);
  }, []);

  const applyAuthResponse = (data) => {
    const token = data?.accessToken || data?.token;
    const nextUser = data?.user || null;

    if (token) {
      persistSession(token, nextUser);
      setAccessToken(token);
    }

    if (nextUser) {
      setUser(nextUser);
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
    }

    return data;
  };

<<<<<<< HEAD
  const logout = () => {
    logoutUser();
=======
  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    return applyAuthResponse(data);
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    return applyAuthResponse(data);
  };

  const logout = async () => {
    await logoutUser();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        isAuthenticated: !!accessToken,
        isAdmin: user?.role === "admin",
        login,
<<<<<<< HEAD
=======
        register,
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

<<<<<<< HEAD
export const useAuth = () => {
  return useContext(AuthContext);
};
=======
export const useAuth = () => useContext(AuthContext);
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
