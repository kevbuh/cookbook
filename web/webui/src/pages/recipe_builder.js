import React from "react";
import Layout from "../hocs/Layout";
import AddRecipe from "../components/AddRecipe";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";

const AddRecipePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userID = useSelector((state) => state.auth.user?.id);
  console.log("USERID:", userID);
  const loading = useSelector((state) => state.auth.loading);

  return (
    <Layout title="CookBook | Add Recipe">
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 bg-stone-100 rounded-lg p-2">
          <p className="text-2xl m-6 underline">Create Recipe</p>
          <div className="px-6 flex flex-col">
            <Formik
              initialValues={{
                author: userID,
                title: "",
                description: "",
                rating: "",
                image: "",
                cook_time: "",
                price: "",
                source: "",
              }}
              onSubmit={(values) => {
                fetch(`/api/account/recipe/`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    // Accept: "application/json",
                    // Authorization:
                    //   "Bearer " +
                    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1ODY2MTgxLCJpYXQiOjE2NTU4NjQzODEsImp0aSI6ImE0OGQ3MzZlMGFkZDRjNjg4OTFkN2NkNmQwNTA2NDdhIiwidXNlcl9pZCI6MX0.a7W6pyLA_C2ZcT2Nv4LGv_qE_f2TCXTskSJ5VuzOnO8",
                  },
                  body: JSON.stringify(values),
                })
                  .then((res) => {
                    res.json();
                    console.log("HERE IS WHAT WE GOT BACK:", res);
                  })
                  .catch((error) => console.log("error", error));
                router.push("/");
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
                {console.log("GOT THIS ID:", userID)}

                <label htmlFor="description">Description</label>
                <Field
                  id="description"
                  name="description"
                  placeholder="Description"
                  className="bg-slate-200 rounded p-1 my-2 w-2/4"
                />

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
    </Layout>
  );
};

export default AddRecipePage;
