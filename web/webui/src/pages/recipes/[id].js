import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import Layout from "../../hocs/Layout";

function SelectedRecipe(data) {
  const sentData = data.data;
  // console.log("SENTDATA", sentData);
  // console.log("ID", sentData.id);
  // console.log("TITLE", sentData.title);
  // console.log("DESC", sentData.description);
  // console.log("CAT", sentData.category);
  // console.log("RATING", sentData.rating);

  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <Layout title={"CookBook | Recipe: " + sentData.id}>
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
                  fetch(`http://127.0.0.1:8000/recipe/${sentData.id}/`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json, text/plain, */*",
                      "User-Agent": "*",
                      Authorization:
                        "Bearer " +
                        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NzYwNTIwLCJpYXQiOjE2NTU3NTg3MjAsImp0aSI6IjU3NjcxMDJlNmNmYjQ3Yjg4Mjg0YjJlYjAxMjZmMGQyIiwidXNlcl9pZCI6MX0.Pd1cgrdCnelSXWNFajfG-jT1PVNYMQZmumXzX5U5C4k",
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
            <div className="text-xl underline font-semibold">
              <div>Title: {sentData.title}</div>
            </div>
            <div className="rounded p-1 bg-slate-200 w-1/6">
              <div>Rating: {sentData.rating}</div>
              <div>Cook Time: {sentData.total_cook_time} mins</div>
              <div>Category:</div>
              {sentData.category.map((d) => (
                <div>{d.name}</div>
              ))}
              <div>Price: ${sentData.price}</div>
            </div>
            <div>Private: {sentData.private}</div>
            <div>Image: {sentData.header_image}</div>
            <div className="py-4">Description: {sentData.description}</div>
            <div>Source: {sentData.source}</div>
            <div>Created: {sentData.created}</div>
            <div>Comments:</div>
            {sentData.comments.map((d) => (
              <div>
                {d.title} - {d.created}{" "}
              </div>
            ))}

            <button
              className="bg-slate-400 p-2 mx-3 my-2 rounded text-white font-semibold"
              onClick={() => setShowEdit((showEdit) => !showEdit)}
            >
              Edit
            </button>
            <button
              className="bg-slate-400 p-2 rounded text-white font-semibold"
              onClick={() => {
                fetch(`http://127.0.0.1:8000/recipe/${sentData.id}/`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json, text/plain, */*",
                    "User-Agent": "*",
                    Authorization:
                      "Bearer " +
                      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NzYwNTIwLCJpYXQiOjE2NTU3NTg3MjAsImp0aSI6IjU3NjcxMDJlNmNmYjQ3Yjg4Mjg0YjJlYjAxMjZmMGQyIiwidXNlcl9pZCI6MX0.Pd1cgrdCnelSXWNFajfG-jT1PVNYMQZmumXzX5U5C4k",
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
    </Layout>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const id = context.query.id; // Get ID from slug `/book/1`
  // If routing to `/book/1?name=some-book`
  // Outputs: `{ id: '1', name: 'some-book' }`

  // Fetch data from external API
  const res = await fetch(`http://127.0.0.1:8000/recipe/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      "User-Agent": "*",
      Authorization:
        "Bearer " +
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NzYwNTIwLCJpYXQiOjE2NTU3NTg3MjAsImp0aSI6IjU3NjcxMDJlNmNmYjQ3Yjg4Mjg0YjJlYjAxMjZmMGQyIiwidXNlcl9pZCI6MX0.Pd1cgrdCnelSXWNFajfG-jT1PVNYMQZmumXzX5U5C4k",
    },
  });
  const data = await res.json();
  console.log("SENT DATA", data);

  // Pass data to the page via props
  return { props: { data } };
}

export default SelectedRecipe;
