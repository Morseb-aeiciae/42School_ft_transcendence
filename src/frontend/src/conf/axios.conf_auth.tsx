import axios, { AxiosResponse } from "axios";

export const apiAuth = axios.create({
  baseURL: "http://localhost:3001/auth",
  timeout: 3000,
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
    // Request made and server responded
    // console.log("1", err.response.data);
    // console.log("2", err.response.status);
    // console.log("3", err.response.headers);
    return Promise.reject("friends errHandler here");
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
  // console.log("response : ", response);
  return response;
};

apiAuth.interceptors.response.use(
  (response) => successHandler(response),
  (err) => errorHandler(err)
);
