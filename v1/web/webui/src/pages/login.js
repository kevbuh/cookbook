// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/router";
// import { login, reset_register_success } from "../actions/auth";
// import Layout from "../hocs/Layout";

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const loading = useSelector((state) => state.auth.loading);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const { email, password } = formData;

//   useEffect(() => {
//     if (dispatch && dispatch !== null && dispatch !== undefined)
//       dispatch(reset_register_success());
//   }, [dispatch]);

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (dispatch && dispatch !== null && dispatch !== undefined)
//       dispatch(login(email, password));
//   };

//   if (typeof window !== "undefined" && isAuthenticated) router.push("/profile");

//   return (
//     <Layout title="CookBook | Login">
//       <p className="text-xl ml-6">Login</p>
//       <form className="rounded bg-stone-200 w-1/2 ml-6" onSubmit={onSubmit}>
//         <div>
//           <label htmlFor="email">
//             <strong>Email*</strong>
//           </label>
//           <input
//             type="text"
//             name="email"
//             placeholder="example@email.com"
//             onChange={onChange}
//             value={email}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">
//             <strong>Password*</strong>
//           </label>
//           <input
//             type="password"
//             name="password"
//             placeholder="password"
//             onChange={onChange}
//             value={password}
//             required
//           />
//         </div>
//         {loading ? (
//           <div className="mt-5">
//             <h1>LOADING</h1>
//           </div>
//         ) : (
//           <button
//             className="rounded p-2 m-2 bg-stone-400 text-white"
//             type="submit"
//           >
//             Login
//           </button>
//         )}
//       </form>
//     </Layout>
//   );
// };

// export default LoginPage;
