import { useContext, useState } from "react";
import Iframe from "react-iframe";
import AuthContext from "../../../context";

const LaunchGameTraining = () => {
  return (
    <section>
      <p>
        mouse to move cam <br />
        <br />
        blue bar : <br /> 'S' to move down <br />
        'W' to move up <br />
        <br />
        pink bar : <br />
        arrow up and down
      </p>
      <Iframe
        url="../pong3D.html"
        position="absolute"
        width="100%"
        id="myId"
        className="pong3D"
        height="50%"
      />
    </section>
  );
};

const LaunchGameOnline = () => {
  return (
    <section>
      <p>
        mouse to move cam <br /> 'S' to move down <br />
        'W' to move up
      </p>
      <Iframe
        url="../pong3D.html"
        position="absolute"
        width="100%"
        id="myId"
        className="pong3D"
        height="50%"
      />
    </section>
  );
};

const Game = () => {
  const [state, setState] = useState("");
  const context = useContext(AuthContext);
  if (context.auth.user)
  {
	  const userId = context.auth.user.id;
	  localStorage.setItem("id", userId.toString());
  }
  if (state === "play") return <LaunchGameOnline />;
  else if (state === "train") return <LaunchGameTraining />;
  else
    return (
      <section className="container">
        <div className="row">
			<p>You can choose between 2 modes : classical or with bonus </p>
          <button
            className="btn btn-secondary btn-lg p-2 mb-2"
            onClick={() => {
              setState("play");
			  localStorage.setItem("mode", "0");
            }}
          >
            Classic
          </button>
          <button
            className="btn btn-secondary btn-lg p-2"
            onClick={() => {
              setState("train");
			  localStorage.setItem("mode", "1");
            }}
          >
            Bonus
          </button>
        </div>
      </section>
    );
};

export default Game;
