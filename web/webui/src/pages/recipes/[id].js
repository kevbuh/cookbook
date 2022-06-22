import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import Layout from "../../hocs/Layout";
import { useSelector } from "react-redux";

function SelectedRecipe(data) {
  const sentData = data.data;
  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [liked, setLiked] = useState(false);

  const userID = useSelector((state) => state.auth.user?.id);

  // console.log("USERID:", userID);

  return (
    <Layout title={"CookBook | Recipe: " + sentData.id}>
      <div className="px-6">
        {showEdit ? (
          <div>
            <div className="p-6 flex flex-col">
              <Formik
                initialValues={{
                  author: userID,
                  title: sentData.title,
                  description: sentData.description,
                  image: sentData.image,
                  cook_time: sentData.cook_time,
                  price: sentData.price,
                  source: sentData.source,
                  recipeID: sentData.id,
                }}
                onSubmit={(values) => {
                  fetch(`/api/account/update_recipe`, {
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
                  <label htmlFor="title">Title</label>
                  <Field
                    id="title"
                    name="title"
                    placeholder="Title"
                    className="bg-stone-200 rounded p-1 my-2 w-2/4"
                  />

                  <label htmlFor="description">Description</label>
                  <Field
                    id="description"
                    name="description"
                    placeholder="Description"
                    className="bg-stone-200 rounded p-1 my-2 w-2/4"
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
                  <div className="flex flex-row items-end ">
                    <button
                      className="bg-stone-400 p-2 mr-3 my-2 rounded text-white font-semibold w-1/6"
                      onClick={() => setShowEdit((showEdit) => !showEdit)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-emerald-400 p-2 my-2 rounded text-white font-semibold w-1/6"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xl underline font-semibold">
              <div>Title: {sentData.title}</div>
            </div>
            <div className="rounded p-1 bg-stone-200 w-1/6">
              <div>Rating: {sentData.avg_rating}</div>
              <div>Cook Time: {sentData.total_cook_time} mins</div>
              <div>Category:</div>
              {sentData.category.map((d) => (
                <div>{d.name}</div>
              ))}
              <div>Price: ${sentData.price}</div>
              {userID && userID === sentData.author ? null : (
                <div>
                  {!liked ? (
                    <button
                      type="submit"
                      className="bg-emerald-400 p-2 my-2 rounded text-white font-semibold"
                      onClick={() => {
                        fetch("/api/account/like_recipe", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            liked_recipe: sentData.id,
                            user: userID,
                          }),
                        }).catch((error) => console.log("error", error));
                        // router.push("/");
                        setLiked((liked) => !liked);
                      }}
                    >
                      Like
                    </button>
                  ) : (
                    <div>You liked this recipe!</div>
                  )}
                </div>
              )}
            </div>
            <div>Private: {sentData.private}</div>
            <div>Image: {sentData.header_image}</div>
            <div className="py-4">Description: {sentData.description}</div>
            <div>Source: {sentData.source}</div>
            <div>Created: {sentData.created}</div>
            <div>Comments:</div>
            <div>Number of likes: {sentData.num_likes}</div>

            {sentData.comments.map((d) => (
              <div>
                {d.title} - {d.created}{" "}
              </div>
            ))}
            {userID && userID === sentData.author ? (
              <>
                <button
                  className="bg-stone-400 p-2 mx-3 my-2 rounded text-white font-semibold"
                  onClick={() => setShowEdit((showEdit) => !showEdit)}
                >
                  Edit
                </button>
                <button
                  className="bg-stone-400 p-2 rounded text-white font-semibold"
                  onClick={() => {
                    fetch("/api/account/delete_recipe", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(sentData.id),
                    }).catch((error) => console.log("error", error));
                    router.push("/");
                  }}
                >
                  Delete
                </button>
              </>
            ) : (
              <div>
                {/* <div>Give a rating</div> */}

                {showRate ? (
                  <div>
                    <Formik
                      initialValues={{
                        user: userID,
                        rate: "",
                        recipe: sentData.id,
                      }}
                      onSubmit={(values) => {
                        fetch(`/api/account/post_rating`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(values),
                        })
                          .then((res) => res.json())
                          .catch((error) => console.log("error", error));
                        router.reload(window.location.pathname);
                      }}
                    >
                      <Form className="py-3 pl-3 flex flex-col  w-1/2 rounded bg-gray-200  mt-6">
                        <label htmlFor="rate" className=" rounded text-xl">
                          Rate this recipe below:
                        </label>
                        <Field
                          id="rate"
                          name="rate"
                          placeholder="Give a rating 1-5 stars"
                          className="bg-white rounded p-1 my-2 w-2/4"
                        />

                        <div className="flex flex-row items-end ">
                          <button
                            className="bg-stone-400 p-2 mr-3 my-2 rounded text-white font-semibold w-1/6"
                            onClick={() => setShowRate((showRate) => !showRate)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-emerald-400 p-2 my-2 rounded text-white font-semibold w-1/6"
                            // onClick={(values) =>
                            //   setShowEdit((showEdit) => !showEdit)
                            // }
                          >
                            Submit
                          </button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                ) : (
                  <button
                    className="bg-stone-400 p-2 rounded text-white font-semibold"
                    // onClick={() => {
                    //   fetch("/api/account/delete_recipe", {
                    //     method: "POST",
                    //     headers: {
                    //       "Content-Type": "application/json",
                    //     },
                    //     body: JSON.stringify(sentData.id),
                    //   }).catch((error) => console.log("error", error));
                    //   router.push("/");
                    // }}
                    onClick={() => setShowRate((showRate) => !showRate)}
                  >
                    Rate
                  </button>
                )}
              </div>
            )}
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
      Accept: "application/json",
    },
  });
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default SelectedRecipe;
