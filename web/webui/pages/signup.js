import React from "react";
import NavBar from "../components/NavBar";
import { Formik, Field, Form } from "formik";
import Router from "next/router";

function signup() {
  return (
    <div>
      <NavBar />
      <p className="text-xl ml-6">Sign Up Page</p>
      <div className="ml-6 my-4">
        <div className="">
          <Formik
            initialValues={{
              email: "",
              password: "",
              password2: "",
            }}
            onSubmit={(values) => {
              fetch("http://127.0.0.1:8000/auth/register/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json, text/plain, */*",
                  "User-Agent": "*",
                  // Authorization:
                  //   "Bearer " +
                  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1ODY1MzY2LCJpYXQiOjE2NTU2OTI1NjYsImp0aSI6ImJiYTZhOGUxODI0ZjQ0YmU5ODE3YzdhNzgwZTk3MDlhIiwidXNlcl9pZCI6Nn0.0y472OF5gdp4KO22lx5DrFFZjizSM6u8T0bsY4o-T_k",
                },
                body: JSON.stringify(values),
              })
                .then((res) => res.json())
                .then((res) => console.log(res.json()))
                .catch((error) => console.log("error", error));
              Router.reload();
            }}
          >
            <Form className="flex flex-col w-full">
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="email@example.com"
                className="bg-slate-200 rounded p-1 my-2 w-2/4"
              />

              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                placeholder="Password"
                className="bg-slate-200 rounded p-1 my-2 w-2/4"
              />

              <label htmlFor="password2">Confirm Password</label>
              <Field
                id="password2"
                name="password2"
                placeholder="Confirm Password"
                className="bg-slate-200 rounded p-1 my-2 w-2/4"
              />

              <button
                type="submit"
                className="rounded px-3  py-2 my-2 bg-pink-600 w-1/6 text-white font-medium"
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default signup;
