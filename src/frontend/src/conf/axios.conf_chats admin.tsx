import axios, { AxiosResponse } from "axios";

export const apiChatAdmin = axios.create({
  baseURL: "http://localhost:3001/chat/admin",
  timeout: 3000,
});

/**********************************************/
//  interceptor request
/**********************************************/

apiChatAdmin.interceptors.request.use((req) => {
  let token = localStorage.getItem("token");
  req.headers["Authorization"] = "Bearer " + token;
  return req;
});

/**********************************************/
//  interceptor response
/**********************************************/

const errorHandler = (err: any) => {
  if (err.response) {
    if (err.response.status === 409)
      return Promise.reject("chatAdmin errHandler here");
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

apiChatAdmin.interceptors.response.use(
  (response) => successHandler(response),
  (err) => errorHandler(err)
);
