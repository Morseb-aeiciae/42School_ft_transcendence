import React from "react";
import { AppState } from "./App";
import { User } from "./Interfaces";

const initialContext: AppState = {
  auth: { isLoggedIn: false, user: null },
  users: [],
  login: () => {},
  logout: () => {},
  changeContent: (string) => {},
  updateUser: (user) => {},
  updateUsers: (users: Array<User>) => {},
  status: "noConnected",
  content: "none",
};

const AuthContext: React.Context<AppState> =
  React.createContext(initialContext);

export default AuthContext;
