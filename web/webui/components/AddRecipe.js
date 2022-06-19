import React from "react";
import { Formik, Field, Form } from "formik";
import Router from "next/router";

const AddRecipe = () => (
  <div className="p-6 flex flex-col">
    <Formik
      initialValues={{
        author: "1",
        title: "",
        description: "",
      }}
      onSubmit={(values) => {
        fetch("http://127.0.0.1:8000/recipes/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .catch((error) => console.log("error", error));
        Router.reload();
      }}
    >
      <Form className="flex flex-col">
        <label htmlFor="author">Author</label>
        <Field
          id="author"
          name="author"
          placeholder="Author"
          className="bg-slate-200 rounded p-1 my-2 w-2/4"
        />

        <label htmlFor="title">Title</label>
        <Field
          id="title"
          name="title"
          placeholder="Title"
          className="bg-slate-200 rounded p-1 my-2 w-2/4"
        />

        <label htmlFor="description">Description</label>
        <Field
          id="description"
          name="description"
          placeholder="Description"
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
);

export default AddRecipe;
