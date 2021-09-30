const Login = () => {
  return (
    <section className="bg-dark text-light p-5 text-center flex-grow-1">
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
        <form className="bg-secondary p-5 d-flex flex-column border">
          <div className="form-group">
            <label htmlFor="">Userame</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="">Email</label>
            <input type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="">Password</label>
            <input type="password" className="form-control" />
          </div>
          <button className="btn btn-small btn-primary">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
