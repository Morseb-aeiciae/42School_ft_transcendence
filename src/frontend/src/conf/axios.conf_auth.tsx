import axios, { AxiosResponse } from "axios";

const configHeaders = {
  "Access-Control-Allow-Origin": "*",
  "content-type": "application/json",
  Accept: "*/*",
  "Access-Control-Max-Age": 12,
  "Access-Control-Allow-Headers":
    "Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
};

export const apiAuth = axios.create({
  baseURL: "http://" + process.env.REACT_APP_DOMAIN_FRONTEND + "/auth",
  headers: configHeaders,
  timeout: 10000,
});

/**********************************************/
//  interceptor request
/**********************************************/

apiAuth.interceptors.request.use((req) => {
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

apiAuth.interceptors.response.use(
  (response) => successHandler(response),
  (err) => errorHandler(err)
);
