import axios, { AxiosResponse } from "axios";
// import { useContext } from "react";
// import AuthContext from "../context";

const configHeaders = {
  "content-type": "application/json",
  Accept: "*/*",
  "Access-Control-Max-Age": 12,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

export const apiAdmin = axios.create({
  baseURL: "http://localhost:3001/admin",
  headers: configHeaders,
  timeout: 3000,
});

/**********************************************/
//  interceptor request
/**********************************************/

apiAdmin.interceptors.request.use((req) => {
  let token = localStorage.getItem("token");
  req.headers["Authorization"] = "Bearer " + token;
  return req;
});

/**********************************************/
//  interceptor response
/**********************************************/

const errorHandler = (err: any) => {
  if (err.response) {
    return Promise.reject("auth errHandler here");
  } else if (err.request) {
    console.log(err.request);
  } else {
    console.log("err", err.message);
  }
  return Promise.reject(err);
};

const successHandler = (response: AxiosResponse) => {
  return response;
};

apiAdmin.interceptors.response.use(
  (response) => successHandler(response),
  (err) => errorHandler(err)
);
