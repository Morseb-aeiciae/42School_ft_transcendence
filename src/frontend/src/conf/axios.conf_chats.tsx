import axios, { AxiosResponse } from "axios";

export const apiChat = axios.create({
  baseURL: "http://localhost:3001/chat",
  timeout: 3000,
});

/**********************************************/
//  interceptor request
/**********************************************/

apiChat.interceptors.request.use((req) => {
  return req;
});

/**********************************************/
//  interceptor response
/**********************************************/

const errorHandler = (err: any) => {
  if (err.response) {
    if (err.response.status === 409)
      return Promise.reject("chat errHandler here");
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

apiChat.interceptors.response.use(
  (response) => successHandler(response),
  (err) => errorHandler(err)
);
