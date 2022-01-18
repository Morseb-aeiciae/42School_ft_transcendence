import React from "react";
import { AppState } from "./App";

const initialContext: AppState = {
  auth: { isLoggedIn: false, user: null },
  users: [],
  updateUser: (b, user) => {},
  status: "noConnected",
  changeStatus: (string) => {},
  content: "none",
  changeContent: (string) => {},
  token: "",
  updateToken: (token) => {},
};

const AuthContext: React.Context<AppState> =
  React.createContext(initialContext);

export default AuthContext;
