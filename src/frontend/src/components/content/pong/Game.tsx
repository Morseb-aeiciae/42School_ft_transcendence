import Iframe from 'react-iframe'

const Game = () => {
  return (
    <section>
			<Iframe url="../pong3D.html"
            position="absolute"
            width="100%"
            id="myId"
            className="pong3D"
            height="50%"/>
    </section>
  );
};

export default Game;
