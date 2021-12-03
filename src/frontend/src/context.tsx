import React from "react";
import { AppState } from "./App";

const initialContext: AppState = {
  auth: { isLoggedIn: false, user: null },
  users: [],
  changeContent: (string) => {},
  changeStatus: (string) => {},
  changeRender: (number) => {},
  updateUser: (b, user) => {},
  status: "noConnected",
  content: "none",
  switchRender: 0,
};

const AuthContext: React.Context<AppState> =
  React.createContext(initialContext);

export default AuthContext;
