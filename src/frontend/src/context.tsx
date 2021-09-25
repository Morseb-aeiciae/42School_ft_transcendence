import React from "react";
import { AppState } from "./App";

const initialContext: AppState = {
  auth: { isLoggedIn: false, user: null },
  login: () => {},
  logout: () => {},
  changeContent: (string) => {},
  status: "noConnected",
  content: "",
};

const AuthContext: React.Context<AppState> =
  React.createContext(initialContext);

export default AuthContext;
