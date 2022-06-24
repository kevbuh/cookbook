import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { register } from "../actions/auth";
import Link from "next/link";

function about() {
  const dispatch = useDispatch();
  const router = useRouter();
  const register_success = useSelector((state) => state.auth.register_success);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const [shouldShowLogin, setShouldShowLogin] = useState(false);

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
    console.log("FORM DATA:", email, password, password2);

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(register(email, password, password2));
    }
  };

  if (register_success) router.push("/login");

  return (
    <div className=" flex flex-col  mx-6 my-5 self-center ">
      <div className="grid justify-items-end">
        {!isAuthenticated ? (
          <div>
            <Link href="/login">
              <a className="text-lg">Log In &nbsp;</a>
            </Link>
            <Link href="/signup">
              <a className="text-lg">Sign Up </a>
            </Link>
          </div>
        ) : (
          <Link href="/profile">
            <a className="text-lg">Your Account </a>
          </Link>
        )}
      </div>
      <div></div>
      <div className="w-2/3 flex flex-col items-center justify-self-center">
        <div className="">
          <div className="flex flex-col text-6xl my-8 h-60">
            <div className="flex m-auto  items-baseline">
              <p className=" flex  mr-10">CookBook</p>
              <p className=" flex justify-center items-center text-xl">
                Everything food, personalized&nbsp;
                <span className=" text-pink-600 font-semibold">for you.</span>
              </p>
            </div>
          </div>
          <div>
            <p className="text-lg">Find recipes personalized to you</p>
            <p className="text-lg">The best categories for your goals</p>
            <p className="text-lg">
              Spend less time looking, more time enjoying
            </p>
            <p className="text-lg">Find your future favorite meal</p>
            <p className="text-lg">Plan Less, Eat Better</p>
            <p className="text-lg">Make your next meal an experience</p>
            <p className="text-lg">
              The food platform for everybody, everywhere
            </p>
          </div>

          <div className="mt-8 mb-20">
            <div className="">
              {shouldShowLogin ? (
                <form
                  className="rounded-lg bg-stone-100 p-8 w-1/2 flex flex-col items-center"
                  onSubmit={onSubmit}
                >
                  <p className="text-xl mb-4">Login!</p>
                  <div className="">
                    <label htmlFor="email">
                      <p>Email</p>
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      onChange={onChange}
                      value={email}
                      required
                      className="my-2 p-2 rounded"
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="password">
                      <p>Password</p>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      onChange={onChange}
                      value={password}
                      required
                      className="my-2 p-2 rounded"
                    />
                  </div>
                  {loading ? (
                    <div>
                      <h1>LOADING</h1>
                    </div>
                  ) : (
                    <div>
                      {email.length > 8 && password.length > 8 ? (
                        <button
                          className="rounded py-2 px-8 mt-2 bg-pink-600 text-white "
                          type="submit"
                        >
                          Continue!
                        </button>
                      ) : (
                        <p
                          className="rounded p-2 mt-2 bg-stone-400 text-white cursor-default"
                          // type="submit"
                        >
                          Fill out all fields!
                        </p>
                      )}
                    </div>
                  )}
                  <div className="mt-2 flex  items-center ">
                    Haven't Signed Up? &nbsp;
                    <button
                      className="underline"
                      onClick={() =>
                        setShouldShowLogin(
                          (shouldShowLogin) => !shouldShowLogin
                        )
                      }
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  className="rounded-lg bg-stone-100 p-8 w-1/2 flex flex-col items-center"
                  onSubmit={onSubmit}
                >
                  <p className="text-xl mb-4">Sign Up To Start Eating!</p>
                  <div className="">
                    <label htmlFor="email">
                      <p>Email</p>
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      onChange={onChange}
                      value={email}
                      required
                      className="my-2 p-2 rounded"
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="password">
                      <p>Password</p>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      onChange={onChange}
                      value={password}
                      required
                      className="my-2 p-2 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="password2">
                      <p>Confirm Password</p>
                    </label>
                    <input
                      type="password"
                      name="password2"
                      placeholder="Confirm password"
                      onChange={onChange}
                      value={password2}
                      required
                      className="my-2 p-2 rounded"
                    />
                  </div>
                  {loading ? (
                    <div>
                      <h1>LOADING</h1>
                    </div>
                  ) : (
                    <div>
                      {email.length > 8 &&
                      password.length > 8 &&
                      password2.length > 8 ? (
                        <button
                          className="rounded py-2 px-8 mt-2 bg-pink-600 text-white "
                          type="submit"
                        >
                          Continue!
                        </button>
                      ) : (
                        <p
                          className="rounded p-2 mt-2 bg-stone-400 text-white cursor-default"
                          // type="submit"
                        >
                          Fill out all fields!
                        </p>
                      )}
                    </div>

                    // <button
                    //   className={
                    //     password2.length > 8 &&
                    //     email.length > 8 &&
                    //     password.length > 8
                    //       ? "rounded p-2 mt-2 bg-pink-600 text-white w-2/3"
                    //       : "rounded p-2 mt-2 bg-stone-400 text-white w-1/2"
                    //   }
                    //   type="submit"
                    // >
                    //   Continue
                    // </button>
                  )}
                  <div className="mt-2 flex  items-center ">
                    Already eating? &nbsp;
                    <button
                      className="underline"
                      onClick={() =>
                        setShouldShowLogin(
                          (shouldShowLogin) => !shouldShowLogin
                        )
                      }
                    >
                      Login
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default about;
