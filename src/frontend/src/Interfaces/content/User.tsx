export default interface User {
  id: number;
  userName: string;
  img: string;
  win: number;
  loose: number;
  isLoggedIn: boolean;
  History: any;
  [propName: string]: any;
  [propName: number]: any;
}
