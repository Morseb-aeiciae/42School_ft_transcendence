export default interface Chat {
  id: number;
  chanName: string;
  type: string;
  [propName: string]: any;
  [propName: number]: any;
}
