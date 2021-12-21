import axios, { AxiosResponse } from "axios";

export const apiFriends = axios.create({
  baseURL: "http://localhost:3001/friends",
  timeout: 3000,
});

/**********************************************/
//  interceptor request
/**********************************************/

apiFriends.interceptors.request.use((req) => {
  return req;
});

/**********************************************/
//  interceptor response
/**********************************************/

const errorHandler = (err: any) => {
  if (err.response) {
    return Promise.reject("friends errHandler here");
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

apiFriends.interceptors.response.use(
  (response) => successHandler(response),
  (err) => errorHandler(err)
);
