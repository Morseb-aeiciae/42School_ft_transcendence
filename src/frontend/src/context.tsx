import React from "react";

interface AppState {
	auth: { isLoggedIn: boolean; user: any};
	users: Array<any>;
	updateUser: (b: boolean, user: any) => any;
	changeContent: (newStatus: string) => any;
	changeStatus: (newStatus: string) => any;
	changeRender: (newStatus: number) => any;
	status: string;
	content: string;
	switchRender: number;
	token: string;
	updateToken: (token: string) => any;
  }

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
