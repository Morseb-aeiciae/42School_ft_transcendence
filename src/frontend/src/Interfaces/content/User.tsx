export default interface User {
  id: number;
  username: string;
  email: string;
  img: string;
  win: number;
  loose: number;
  isLoggedIn: boolean;
  history: any;
  [propName: string]: any;
  [propName: number]: any;
}
