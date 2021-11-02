const CurrentChat = () => {
  //   const [chats, setChats] = useState([]);
  //   const [test, setTest] = useState(0);

  return (
    <section>
      <div className="container">
        <h2>Chat name</h2>
        <div className="d-flex border bg-primary text-dark">
          <hr />

          <div className="flex-fill border p-2 m-1 bg-light">
            <h5>Owner :crown:</h5>
            <br />
            <p className="m-0">History of chat 1 ...</p>
            <p className="m-0">History of chat 1 ...</p>
            <p className="m-0">History of chat 1 ...</p>
            <p className="m-0">History of chat 1 ...</p>
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                style={{ height: "100px" }}
              ></textarea>
              <label htmlFor="floatingTextarea2">Write your text here</label>
            </div>
          </div>
          <div className="m-2">
            <div className="bg-light rounded px-1 mb-1">user 1</div>
            <div className="bg-light rounded px-1 mb-1">user 2</div>
            <div className="bg-light rounded px-1 mb-1">user 3</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentChat;
