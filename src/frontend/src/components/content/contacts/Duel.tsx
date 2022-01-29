import { useState, useEffect } from "react";
import { Loading } from "../..";
import Game from "../pong/Game";

const Duel = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const target = props.targetId;
  const userId = props.userId;

  useEffect(() => {
    setLoading(false);
  }, []);
  localStorage.setItem("duel", target);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <section>
        <p>
          Waiting for opponent to join
        </p>
		<Game />
      </section>
    );
  }
};

export default Duel;
