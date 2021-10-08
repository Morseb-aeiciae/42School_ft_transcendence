import { Component } from "react";

const tmp = () => {};
export default tmp;

// interface SignUpProps {
//   user: {
//     username: string;
//     email: string;
//     password: string;
//   };
// }

// export default class SignUpModal extends Component<SignUpProps> {
//   getInitialValues = () => {
//     return this.props.user
//       ? { ...this.props.user }
//       : { username: "", email: "", password: "" };
//   };

//   render() {
//     return (
//       <div
//         className="modal fade"
//         id="log"
//         tabIndex={-1}
//         aria-labelledby="logLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content bg-dark text-light">
//             <div className="modal-header">
//               <h5 className="modal-title" id="logLabel">
//                 Sign up
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form>
//                 <div className="mb-3">
//                   {/* <label htmlFor="Username" className="col-form-name">
//     Username:
//   </label> */}
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="Username"
//                     placeholder="Username"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   {/* <label htmlFor="Email" className="col-form-name">
//     Email:
//   </label> */}
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="Email"
//                     placeholder="Email"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   {/* <label htmlFor="Password" className="col-form-name">
//     Password:
//   </label> */}
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="Password"
//                     placeholder="Password"
//                   />
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 // if succes
//                 // onClick={this.context.login}
//               >
//                 Sign up
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
