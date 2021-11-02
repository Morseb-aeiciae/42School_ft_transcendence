import React from "react";
import { AppState } from "./App";
// import { User } from "./Interfaces";

const initialContext: AppState = {
  auth: { isLoggedIn: false, user: null },
  users: [],
  changeContent: (string) => {},
  updateUser: (b, user) => {},
  status: "noConnected",
  content: "none",
};

const AuthContext: React.Context<AppState> =
  React.createContext(initialContext);

export default AuthContext;
