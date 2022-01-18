const SignInModal = () => {
  return (
    <div
      className="modal fade"
      id="log"
      tabIndex={-1}
      aria-labelledby="logLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-light">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={() => {
              window.location.href =
                "https://api.intra.42.fr/oauth/authorize?client_id=4b246ff59cfa4b2fa13f340cb680a2eb8c6428afcaf81a92d544f1537680741c&redirect_uri=http%3A%2F%2Flocalhost%2Fauth%2F&response_type=code";
            }}
          >
            42 Api
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
