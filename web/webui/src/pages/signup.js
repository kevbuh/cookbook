import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { register } from "../actions/auth";
import Layout from "../hocs/Layout";

function signup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const register_success = useSelector((state) => state.auth.register_success);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

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

  if (typeof window !== "undefined" && isAuthenticated)
    router.push("/dashboard");
  if (register_success) router.push("/login");

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
        {loading ? (
          <div>
            <h1>LOADING</h1>
          </div>
        ) : (
          <button
            className="rounded p-2 m-2 bg-stone-400 text-white"
            type="submit"
          >
            Create Account
          </button>
        )}
      </form>
    </Layout>
  );
}

export default signup;
