import React, { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { Formik, Field, Form } from "formik";
import NavBar from "../../components/NavBar";

function SelectedRecipe(data) {
  const sentData = data.data;
  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div>
      <NavBar />
      <div className="px-6">
        {showEdit ? (
          <div>
            <div className="p-6 flex flex-col">
              <Formik
                initialValues={{
                  author: "1",
                  title: sentData.title,
                  description: sentData.description,
                }}
                onSubmit={(values) => {
                  fetch(`http://127.0.0.1:8000/recipes/${sentData.id}/`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  })
                    .then((res) => res.json())
                    .catch((error) => console.log("error", error));
                  router.push("/");
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
            <button
              className="bg-slate-400 p-2 mx-3 my-2 rounded text-white font-semibold"
              onClick={() => setShowEdit((showEdit) => !showEdit)}
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xl underline font-semibold mx-2">
              #{sentData.id} - {sentData.title}
            </p>
            <div className="rounded p-1 bg-slate-200 w-1/6">
              <p>Rating: {sentData.rating}/5</p>
              <p>Time: {sentData.total_cook_time}</p>
              <p>Category: {sentData.category}</p>
            </div>
            <div className="py-4">
              <p>Description:</p>
              <p>{sentData.description}</p>
            </div>
            <p>Private: {sentData.private}</p>
            <p>Image: {sentData.header_image}</p>
            <p>Source: {sentData.source}</p>
            <button
              className="bg-slate-400 p-2 mx-3 my-2 rounded text-white font-semibold"
              onClick={() => setShowEdit((showEdit) => !showEdit)}
            >
              Edit
            </button>
            <button
              className="bg-slate-400 p-2 rounded text-white font-semibold"
              onClick={() => {
                fetch(`http://127.0.0.1:8000/recipes/${sentData.id}/`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then(console.log("TRIED TO DELETE"))
                  .catch((error) => console.log("error", error));
                router.push("/");
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const id = context.query.id; // Get ID from slug `/book/1`
  // If routing to `/book/1?name=some-book`
  // Outputs: `{ id: '1', name: 'some-book' }`
  // console.log("CONTEXT:", context.query);

  // Fetch data from external API
  const res = await fetch(`http://127.0.0.1:8000/recipes/${id}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default SelectedRecipe;
