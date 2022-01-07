import axios, { AxiosResponse } from "axios";
// import { useContext } from "react";
// import AuthContext from "../context";

const configHeaders = {
  "content-type": "application/json",
  Accept: "*/*",
  "Access-Control-Max-Age": 12,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

export const apiLocal3001 = axios.create({
  baseURL: "http://localhost:3001",
  headers: configHeaders,
  timeout: 3000,
});

export const apiUser = axios.create({
  baseURL: "http://localhost:3001/user",
  headers: configHeaders,
  timeout: 3000,
});

const apiUsers = axios.create({
  baseURL: "http://localhost:3001/users",
  headers: configHeaders,
  timeout: 3000,
});
export default apiUsers;

/**********************************************/
//  interceptor request
/**********************************************/

apiUsers.interceptors.request.use((req) => {
  let token = localStorage.getItem("token");
  req.headers["Authorization"] = "Bearer " + token;
  return req;
});

/**********************************************/
//  interceptor response
/**********************************************/

const errorHandler = (err: any) => {
  if (err.response) {
    // Request made and server responded
    // console.log("1", err.response.data);
    // console.log("2", err.response.status);
    // console.log("3", err.response.headers);
    if (err.response.status === 409)
      return Promise.reject("username already exist");
  } else if (err.request) {
    // The request was made but no response was received
    console.log(err.request);
  } else {
    // Something happened in setting up the request that triggered an err
    console.log("err", err.message);
  }
  return Promise.reject(err);
};

const successHandler = (response: AxiosResponse) => {
  return response;
};

apiUsers.interceptors.response.use(
  (response) => successHandler(response),
  (err) => errorHandler(err)
);
