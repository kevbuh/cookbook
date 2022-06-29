import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { register, login, reset_register_success } from "../actions/auth";
import Link from "next/link";
import Footer from "../components/Footer";

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useQuery } from "react-query";

function AboutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const register_success = useSelector((state) => state.auth.register_success);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [shouldShowLogin, setShouldShowLogin] = useState(false);
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  if (register_success) {
    // sign user in
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(login(emailLogin, passwordLogin));
    }

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(reset_register_success());
    }
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
            <div className="flex flex-row text-6xl my-8 h-30">
              <div className="flex flex-col m-auto items-center ">
                <p className="mb-4">CookBook</p>
                <p className=" flex justify-center items-center text-xl">
                  Everything food, personalized&nbsp;
                  <span className="">for you.</span>
                </p>
              </div>
            </div>
            <div className="mt-10 mb-20">
              <div className="bg-stone-100 p-2 rounded flex flex-col ">
                {shouldShowLogin ? (
                  <div className="flex flex-col items-center">
                    <p className="text-xl mb-4 flex flex-col items-center">
                      Login!
                    </p>

                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={Yup.object({
                        email: Yup.string()
                          .email("Invalid email address")
                          .required("Required"),
                        password: Yup.string()
                          .required("No password provided.")
                          .min(
                            8,
                            "Password is too short - should be 8 chars minimum."
                          )
                          .matches(
                            /[a-zA-Z]/,
                            "Password can only contain Latin letters."
                          ),
                      })}
                      onSubmit={(values, { setSubmitting }) => {
                        if (
                          dispatch &&
                          dispatch !== null &&
                          dispatch !== undefined
                        )
                          dispatch(login(values.email, values.password));
                        setSubmitting(false);
                        router.push("/profile"); // break here if you don't add this, also need to fix bug where redux is doing login process  3 times over
                      }}
                    >
                      <Form>
                        <div className="rounded-lg bg-stone-100 p-8 flex flex-col items-center">
                          <label htmlFor="email">Email</label>
                          <Field name="email" type="email" />
                          <ErrorMessage name="email">
                            {(msg) => <p className="text-red-600">{msg}</p>}
                          </ErrorMessage>

                          <label htmlFor="password" className="mt-2">
                            Password
                          </label>
                          <Field name="password" type="password" />
                          <ErrorMessage name="password">
                            {(msg) => <p className="text-red-600">{msg}</p>}
                          </ErrorMessage>

                          <button
                            type="submit"
                            className="rounded py-2 px-8 mt-4 bg-pink-600 text-white "
                          >
                            Submit
                          </button>
                        </div>
                      </Form>
                    </Formik>
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
                  </div>
                ) : (
                  <div>
                    <p className="text-xl mb-4">Sign Up!</p>
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={Yup.object({
                        email: Yup.string()
                          .email("Invalid email address")
                          .required("Required"),
                        password: Yup.string()
                          .required("No password provided.")
                          .min(
                            8,
                            "Password is too short - should be 8 chars minimum."
                          )
                          .matches(
                            /[a-zA-Z]/,
                            "Password can only contain Latin letters."
                          ),
                      })}
                      onSubmit={(values, { setSubmitting }) => {
                        if (
                          dispatch &&
                          dispatch !== null &&
                          dispatch !== undefined
                        ) {
                          dispatch(
                            register(
                              values.email,
                              values.password,
                              values.password
                            )
                          );
                          console.log("REGISTERED USER");
                        }
                        setEmailLogin(() => values.email);
                        setPasswordLogin(() => values.password);
                        setSubmitting(false);
                      }}
                    >
                      <Form>
                        <div className="rounded-lg bg-stone-100 p-8 flex flex-col items-center">
                          <label htmlFor="email" className="bg-stone-100">
                            Email Address
                          </label>
                          <Field name="email" type="email" />
                          <ErrorMessage name="email">
                            {(msg) => <p className="text-red-600">{msg}</p>}
                          </ErrorMessage>

                          <label htmlFor="password">Password</label>
                          <Field name="password" type="password" />
                          <ErrorMessage name="password">
                            {(msg) => <p className="text-red-600">{msg}</p>}
                          </ErrorMessage>

                          <button
                            type="submit"
                            className="rounded py-2 px-8 mt-2 bg-pink-600 text-white "
                          >
                            Sign Up
                          </button>
                        </div>
                      </Form>
                    </Formik>

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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <Footer />
      </div>
    </div>
  );
}

export default AboutPage;

// 273 lines of code before formik
