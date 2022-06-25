import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { register, login, reset_register_success } from "../actions/auth";
import Link from "next/link";

function about() {
  const dispatch = useDispatch();
  const router = useRouter();
  const register_success = useSelector((state) => state.auth.register_success);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  const [submittedLogin, setSubmittedLogin] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const onEmailLoginChange = (e) => {
    setEmailLogin(e.target.value);
  };

  const onPasswordLoginChange = (e) => {
    setPasswordLogin(e.target.value);
  };

  const { email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("FORM DATA:", email, password, password2);

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(register(email, password, password));
    }
  };

  if (register_success) {
    // sign user in
    console.log("SINGING USER IN!");
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(login(email, password));

    console.log("UN SUCCESS REGISTER USER IN!");

    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(reset_register_success());

    console.log("PUSHING!");
  }

  if (submittedLogin) {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(login(emailLogin, passwordLogin));
    router.push("/profile"); // break here if you don't add this, also need to fix bug where redux is doing login process  3 times over
  }

  if (typeof window !== "undefined" && isAuthenticated) router.push("/profile");

  return (
    <div className=" flex flex-col  mx-6 my-5 self-center ">
      <div className="grid justify-items-end">
        {!isAuthenticated ? null : ( // </div> //   </Link> //     <a className="text-lg">Sign Up </a> //   <Link href="/signup"> //   </Link> //     <a className="text-lg">Log In &nbsp;</a> //   <Link href="/login"> // <div>
          <Link href="/profile">
            <a className="text-lg">Your Account </a>
          </Link>
        )}
      </div>
      <div>
        <div className=" flex flex-col items-center justify-self-center">
          <div className="flex flex-col items-center justify-self-center">
            <div className="flex flex-row text-6xl my-8 h-60">
              <div className="flex flex-col m-auto items-center ">
                <p className="mb-4">CookBook</p>
                <p className=" flex justify-center items-center text-xl">
                  Everything food, personalized&nbsp;
                  <span className="">for you.</span>
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="mr-20">
                <p className="text-lg">Find recipes personalized to you</p>
                <p className="text-lg">Plan Less, Eat Better</p>
                <p className="text-lg">The best categories for your goals</p>
              </div>
              <div className="ml-20">
                <p className="text-lg">
                  Spend less time looking, more time enjoying
                </p>
                <p className="text-lg">Find your future favorite meal</p>
                <p className="text-lg">Make your next meal an experience</p>
              </div>
            </div>

            <div className="mt-20 mb-20">
              <div className="">
                {shouldShowLogin ? (
                  <form
                    className="rounded-lg bg-stone-100 p-8 flex flex-col items-center"
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
                        onChange={onEmailLoginChange}
                        value={emailLogin}
                        required
                        className="my-2 p-2 rounded"
                      />
                    </div>
                    {emailLogin.length < 8 ? (
                      <div className="text-red-400">What's your email?</div>
                    ) : null}
                    <div className="my-2">
                      <label htmlFor="password">
                        <p>Password</p>
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={onPasswordLoginChange}
                        value={passwordLogin}
                        required
                        className="my-2 p-2 rounded"
                      />
                      {password.length < 8 ? (
                        <div className="text-red-400">
                          8 characters or more!
                        </div>
                      ) : null}
                    </div>
                    {loading ? (
                      <div>
                        <h1>LOADING</h1>
                      </div>
                    ) : (
                      <div>
                        {emailLogin.length > 8 && passwordLogin.length > 8 ? (
                          <button
                            className="rounded py-2 px-8 mt-2 bg-pink-600 text-white "
                            onClick={() => setSubmittedLogin(() => true)}
                          >
                            Continue!
                          </button>
                        ) : (
                          <p className="rounded p-2 mt-2 bg-stone-400 text-white cursor-default">
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
                    className="rounded-lg bg-stone-100 p-8 flex flex-col items-center"
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
                      {email.length < 8 ? (
                        <div className="text-red-400">What's your email?</div>
                      ) : null}
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
                      {password.length < 8 ? (
                        <div className="text-red-400">
                          8 characters or more!
                        </div>
                      ) : null}
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
                          <p className="rounded p-2 mt-2 bg-stone-400 text-white cursor-default">
                            Fill out all fields!
                          </p>
                        )}
                      </div>
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
    </div>
  );
}

export default about;
