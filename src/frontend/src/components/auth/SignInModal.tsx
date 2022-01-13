import { useContext } from "react";
// import { Formik, FormikHelpers } from "formik";
// import apiUsers from "../../conf/axios.conf";
import AuthContext from "../../context";

/**********************************************/
/*          MODAL INTERFACE                   */
/**********************************************/

// const ModalHeader = () => {
//   return (
//     <>
//       <h5 className="modal-title" id="logLabel">
//         Login
//       </h5>
//       <button
//         type="button"
//         className="btn-close"
//         data-bs-dismiss="modal"
//         aria-label="Close"
//       ></button>
//     </>
//   );
// };

// const ModalBody = (submit: any) => {
//   return (
//     <>
//       <Formik
//         onSubmit={submit.submit}
//         initialValues={{ email: "", password: "" }}
//       >
//         {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
//           <>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <input
//                   name="email"
//                   type="email"
//                   className="form-control"
//                   id="Email"
//                   placeholder="Email"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   name="password"
//                   type="password"
//                   className="form-control"
//                   id="Password"
//                   placeholder="Password"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="btn btn-primary"
//                 data-bs-dismiss={"modal"}
//               >
//                 Sign in
//               </button>
//             </form>
//           </>
//         )}
//       </Formik>
//     </>
//   );
// };

// const ModalFooter1 = () => {
//   return (
//     <>
//       <p>No account?</p>
//       <a href="http://localhost/login">Create one ! </a>
//     </>
//   );
// };

// const ModalFooter2 = () => {
//   return (
//     <>
//       <p> Or continue with </p>
//       <button
//         type="button"
//         className="btn btn-secondary"
//         data-bs-dismiss="modal"
//         onClick={() => {
//           window.location.href =
//             "https://api.intra.42.fr/oauth/authorize?client_id=4b246ff59cfa4b2fa13f340cb680a2eb8c6428afcaf81a92d544f1537680741c&redirect_uri=http%3A%2F%2Flocalhost%2Fauth%2F&response_type=code";
//         }}
//       >
//         42 Api
//       </button>
//     </>
//   );
// };

const SignInModal = () => {
  const context = useContext(AuthContext);

  // const submit = (values: any, action: FormikHelpers<any>) => {
  //   apiUsers
  //     .post("/login", values)
  //     .then((response: any) => {
  //       // localStorage.setItem("email", response.data.user.email);
  //       // localStorage.setItem("token", response.data.user.token);
  //       context.updateUser(true, response.data.user);
  //     })
  //     .catch((err: any) => {
  //       console.log("err apiUsers:", err);
  //       context.changeRender(1);
  //       action.setSubmitting(false);
  //     });
  // };

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
          {/* <div className="modal-header">
            <ModalHeader />
          </div>
          <div className="modal-body">
            <ModalBody submit={submit} />
          </div>
          <div className="modal-footer">
            <ModalFooter1 />
          </div>{" "}
          <div className="modal-footer">
            <ModalFooter2 />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
