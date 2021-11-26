import { useState, useEffect } from "react";
import { Loading } from "../..";

const Duel = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const target = props.targetId;
  const userId = props.userId;

  useEffect(() => {
    setLoading(false);
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
