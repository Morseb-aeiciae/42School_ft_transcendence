const WrongInput = (props: any) => {
  return (
    <div className="p-2 border">
      <h4 className="text-center">Wrong input(s)</h4>
      <button
        className="btn btn-info"
        onClick={() => {
          props.setWrong(false);
        }}
      >
        <i className="fas fa-poo fs-1 text-dark"></i>
      </button>
    </div>
  );
};

export default WrongInput;