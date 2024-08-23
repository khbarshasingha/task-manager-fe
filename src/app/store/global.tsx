"use client";

import { PropsWithChildren, createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  userId: "",
  handleUpdateToken: (value: string) => {},
  handleUpdateUser: (value: string) => {},
});

export function UseAuthContext({ children }: PropsWithChildren) {
  const [token, setToken] = useState("janine");
  const [userId, setUserId] = useState("");

  const handleUpdateToken = (value: string) => {
    setToken(value);
  };

  const handleUpdateUser = (value: string) => {
    setUserId(value);
  };
  //   return { token, handleUpdateToken, userId, handleUpdateUser };
  return (
    <AuthContext.Provider
      value={{ token, userId, handleUpdateToken, handleUpdateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
