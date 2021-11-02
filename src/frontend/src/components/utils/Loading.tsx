import { Component } from "react";

export default class Loading extends Component {
  render() {
    return (
      <section className=" bg-dark text-light p-5 text-center flex-grow-1 min-vh-100">
        <h1>Loading</h1>
        <br />
        <img
          alt="loading gif"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Bert2_transp_5B5B5B.gif/120px-Bert2_transp_5B5B5B.gif"
        />
      </section>
    );
  }
}
