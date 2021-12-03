import { useState, useEffect } from "react";
import { Loading } from "../..";

const Duel = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const target = props.targetId;
  const userId = props.userId;

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <section>
        <p>
          Duel : id-{target} VS id-{userId} incomming
        </p>
      </section>
    );
  }
};

export default Duel;
