import React, { createContext, useEffect, useState } from "react";
import { authService } from "./authService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return JSON.parse(user) || null;
  });

  const login = async (inputs) => {
    const { success, data } = await authService.login(inputs);
    if (success) {
      setCurrentUser(data);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  const getDecodedToken = () => {
    const token = localStorage.getItem("user");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    }
    return null;
  };

  const getUserInfo = async () => {
    try {
      const data = await authService.getUserInfo();
      setCurrentUser(data);
      return data;
    } catch (error) {
      console.error("사용자 프로필 가져오기 실패:", error);
      throw error;
    }
  };

  const registerUser = async (inputs) => {
    const result = await authService.registerUser(inputs);
    console.log(result.success)
  };

  const isLogin = () => {
    const user = JSON.parse(localStorage.getItem("user")) || false;
    return user ? true : false;
  };

  useEffect(() => {
    if (currentUser && currentUser.access) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          access_token: currentUser.access,
          refresh_token: currentUser.refresh,
        })
      );
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, registerUser, isLogin, getDecodedToken, getUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
