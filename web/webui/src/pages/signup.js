import { useState } from "react";
import Layout from "../hocs/Layout";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import { register } from "../actions/auth";

function signup() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading); // selects a redux state by selecting the auth reducer
  const register_success = useSelector((state) => state.auth.register_success);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const { email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(register(email, password, password2));
    }
  };

  return (
    <Layout title="CookBook | Sign Up">
      <p className="text-xl ml-6">Sign Up</p>
      <form className="rounded bg-stone-200 w-1/2 ml-6" onSubmit={onSubmit}>
        <h3>Create An Account</h3>
        <div>
          <label htmlFor="email">
            <strong>Email*</strong>
          </label>
          <input
            type="text"
            name="email"
            placeholder="example@email.com"
            onChange={onChange}
            value={email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">
            <strong>Password*</strong>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={onChange}
            value={password}
            required
          />
        </div>
        <div>
          <label htmlFor="password2">
            <strong>Confirm Password*</strong>
          </label>
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            onChange={onChange}
            value={password2}
            required
          />
        </div>
        <button
          className="rounded p-2 m-2 bg-stone-400 text-white"
          type="submit"
        >
          Create Account
        </button>
      </form>
    </Layout>
  );
}

export default signup;

// import Router from "next/router";
// import { Formik, Field, Form } from "formik";
// <div className="ml-6 my-4">
//   <div className="">
//     <Formik
//       initialValues={{
//         email: "",
//         password: "",
//         password2: "",
//       }}
//       onSubmit={(values) => {
//         fetch("http://127.0.0.1:8000/auth/register/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json, text/plain, */*",
//             "User-Agent": "*",
//           },
//           body: JSON.stringify(values),
//         })
//           .then((res) => res.json())
//           .then((res) => console.log(res.json()))
//           .catch((error) => console.log("error", error));
//         Router.reload();
//       }}
//     >
//       <Form className="flex flex-col w-full">
//         <label htmlFor="email">Email</label>
//         <Field
//           id="email"
//           name="email"
//           placeholder="email@example.com"
//           className="bg-slate-200 rounded p-1 my-2 w-2/4"
//         />

//         <label htmlFor="password">Password</label>
//         <Field
//           id="password"
//           name="password"
//           placeholder="Password"
//           className="bg-slate-200 rounded p-1 my-2 w-2/4"
//         />

//         <label htmlFor="password2">Confirm Password</label>
//         <Field
//           id="password2"
//           name="password2"
//           placeholder="Confirm Password"
//           className="bg-slate-200 rounded p-1 my-2 w-2/4"
//         />

//         <button
//           type="submit"
//           className="rounded px-3  py-2 my-2 bg-pink-600 w-1/6 text-white font-medium"
//         >
//           Submit
//         </button>
//       </Form>
//     </Formik>
//   </div>
// </div>
