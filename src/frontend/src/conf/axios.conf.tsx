import axios from "axios";

const apiUser = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 3000,
});

apiUser.interceptors.request.use((req) => {
  req.headers["Authorization"] = "AUTH_TOKEN";
  console.log("request : ", req);
  return req;
});

// apiUser.interceptors.response.use((req) => {
//   req.headers["Authorization"] = "AUTH_TOKEN";
//     console.log("response : ", req);
//   return req;
// });

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
