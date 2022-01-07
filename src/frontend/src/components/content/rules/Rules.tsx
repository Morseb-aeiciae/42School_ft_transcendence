import React from "react";
import AuthContext from "../../../context";
import { User } from "../../../Interfaces";

export default class Rules extends React.Component {
  static contextType = AuthContext;

  render() {
    const user: User = this.context.auth.user;
    return (
      <div className="container-fluid">
        <h1 className="border-bottom  pb-3 mb-3">RULES SECTION</h1>
        <p>
          Hello <span className="text-warning">{user.username}</span>!
        </p>
        <div>
          <h1 className=" ">Rule set</h1>
          <p className="text-start">
            - It is 2 players game.
            <br />
            - Players can move their paddle up and down.
            <br />
            - The ball bounces off the top and bottom walls and the paddles.
            <br />
            - A player scores a point when the ball hits its opponent wall.
            <br />
            - The goal is to have more points that the opponent.
            <br />
            - The game ends when one of the two players reaches the points goal
            or when the time limit is reached.
            <br />
          </p>
        </div>
      </div>
    );
  }
}
