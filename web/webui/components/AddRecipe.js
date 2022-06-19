import React from "react";
import { Formik, Field, Form } from "formik";

const AddRecipe = () => (
  <div>
    <h1>Add Recipe</h1>
    <Formik
      initialValues={{
        author: "",
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
      }}
    >
      <Form>
        <label htmlFor="author">Author</label>
        <Field id="author" name="author" placeholder="Author" />

        <label htmlFor="title">title</label>
        <Field id="title" name="title" placeholder="Title" />

        <label htmlFor="description">description</label>
        <Field id="description" name="description" placeholder="Description" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);

export default AddRecipe;
