import { useContext } from "react";
import AuthContext from "../../../context";
import Users from "./Users";
import Chats from "./Chats";

const SuperAdmin = () => {
  const context = useContext(AuthContext);
  const user = context.auth.user;

  return (
    <section>
      <h1 className="border-bottom border-top fw-bold">ADMIN WEBSITE</h1>
      <div className="container d-flex justify-content-center">
        <p className=" text-start">
          Here, you can : <br />- give rights to users to moderate the website
          with you
          <i className="fas fa-angle-double-up px-2"></i>or demote them
          <i className="fas fa-angle-double-down px-2"></i>
          <br />- ban user
          <i className="fas fa-door-closed px-2"></i>or unban them
          <i className="fas fa-door-open px-2"></i>
          <br />- manage users rights for chat channels
          <i className="fas fa-tasks px-2"></i>
          <br />- see chats wihtout joining
          <i className="far fa-eye px-2"></i>
          <br />- destroy chats
          <i className="fas fa-trash-alt px-2"></i>
          <br />
        </p>
      </div>
      <h1 className="border-bottom border-top">USERS</h1>
      <Users user={user} />
      <br />
      <h1 className="border-bottom border-top">CHATS</h1>
      <Chats />
    </section>
  );
};

export default SuperAdmin;
