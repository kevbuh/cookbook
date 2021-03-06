import { Formik, Field, Form } from "formik";
import Router, { useRouter } from "next/router";
import { API_URL } from "../config";

// const router = useRouter();

const AddRecipe = ({ userID, cookie }) => (
  <div className="px-6 flex flex-col">
    <Formik
      initialValues={{
        author: userID,
        title: "",
        description: "",
      }}
      onSubmit={(values) => {
        fetch("/api/account/recipe/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => {
            res.json();
            useRouter().push("/");
          })
          .catch((error) => console.log("error", error));
      }}
    >
      <Form className="flex flex-col">
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
        {/*
        <label htmlFor="author">Rating</label>
        <Field
          id="rating"
          name="rating"
          placeholder="Enter Rating"
          className="bg-slate-200 rounded p-1 my-2 w-2/4"
        />

        <label htmlFor="image">Image</label>
        <Field
          id="image"
          name="image"
          placeholder="Enter image URL"
          className="bg-slate-200 rounded p-1 my-2 w-2/4"
        />

        <label htmlFor="cook_time">Cook Time</label>
        <Field
          id="cook_time"
          name="cook_time"
          placeholder="Enter cook time"
          className="bg-slate-200 rounded p-1 my-2 w-2/4"
        />

        <label htmlFor="price">Price</label>
        <Field
          id="price"
          name="price"
          placeholder="Enter cook time"
          className="bg-slate-200 rounded p-1 my-2 w-2/4"
        />

        <label htmlFor="source">Source</label>
        <Field
          id="source"
          name="source"
          placeholder="Enter cook time"
          className="bg-slate-200 rounded p-1 my-2 w-2/4"
        /> */}

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
