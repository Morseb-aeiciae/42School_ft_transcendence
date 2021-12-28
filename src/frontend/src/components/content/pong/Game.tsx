import { useState } from "react";
import Iframe from "react-iframe";

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

  if (state === "play") return <LaunchGameOnline />;
  else if (state === "train") return <LaunchGameTraining />;
  else
    return (
      <section className="container">
        <div className="row">
          <button
            className="btn btn-secondary btn-lg p-2 mb-2"
            onClick={() => {
              setState("play");
            }}
          >
            Play Online
          </button>
          <button
            className="btn btn-secondary btn-lg p-2"
            onClick={() => {
              setState("train");
            }}
          >
            Training
          </button>
        </div>
      </section>
    );
};

export default Game;
