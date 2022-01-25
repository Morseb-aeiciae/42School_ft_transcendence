<<<<<<< HEAD
=======

>>>>>>> 0f39d7bcbf66dbbc2d6c5f1574ac4ea7b122a38c
import React from "react";
import { AppState } from "./App";

const initialContext: AppState = {
  auth: { isLoggedIn: false, user: null },
  users: [],
  updateUser: (b, user) => {},
  content: "none",
  changeContent: (string) => {},
  token: "",
  updateToken: (token) => {},
};

const AuthContext: React.Context<AppState> =
  React.createContext(initialContext);

export default AuthContext;
