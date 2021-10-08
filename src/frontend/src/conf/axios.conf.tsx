import axios from "axios";

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
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Headers": "Content-Type",
  //   "Access-Control-Allow-Credentials": "true",
  //   "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  // },
  timeout: 3000,
});

const apiUser = axios.create({
  baseURL: "http://localhost:3001/users",
  headers: configHeaders,
  timeout: 3000,
});

apiUser.interceptors.request.use((req) => {
  // req.headers["Access-Control-Allow-Origin"] = "*";
  // req.headers["Access-Control-Allow-Headers"] = "Content-Type";
  // req.headers["Access-Control-Allow-Credentials"] = "true";
  // req.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS";
  console.log("request : ", req);
  return req;
});

apiUser.interceptors.response.use((req) => {
  //   req.headers["Authorization"] = "AUTH_TOKEN";
  console.log("response : ", req);
  return req;
});

export default apiUser;

export const apiUsersMap = (u: any) => ({
  id: u.id,
  username: u.username,
  img: u.website,
  win: 1,
  loose: 1,
  isLoggedIn: true,
  history: "",
});
