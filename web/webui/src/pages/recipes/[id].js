import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import Layout from "../../hocs/Layout";
import { useSelector } from "react-redux";
import Image from "next/image";

function SelectedRecipe(data) {
  const sentData = data.data;
  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState(false);

  const userID = useSelector((state) => state.auth.user?.id);

  const getStars = (num_stars) => {
    const steps = [];
    for (let i = 1; i <= num_stars; i++) {
      steps.push("⭐️");
    }
    return steps;
  };

  return (
    <Layout title={"CookBook | Recipe: " + sentData.id}>
      <div className=" flex flex-col justify-self-center self-center items-center">
        <div className="w-2/3 bg-stone-200 p-2 rounded-3xl my-5">
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
                      className="bg-stone-100 rounded p-2 my-2 w-2/4 "
                    />

                    <label htmlFor="description">Description</label>
                    <Field
                      id="description"
                      name="description"
                      placeholder="Description"
                      className="bg-stone-100 rounded p-2 my-2 w-2/4 "
                    />

                    <label htmlFor="image">Image</label>
                    <Field
                      id="image"
                      name="image"
                      placeholder="Enter image URL"
                      className="bg-stone-100 rounded p-2 my-2 w-2/4 "
                    />

                    <label htmlFor="cook_time">Cook Time</label>
                    <Field
                      id="cook_time"
                      name="cook_time"
                      placeholder="Enter cook time"
                      className="bg-stone-100 rounded p-2 my-2 w-2/4 "
                    />

                    <label htmlFor="price">Price</label>
                    <Field
                      id="price"
                      name="price"
                      placeholder="Enter cook time"
                      className="bg-stone-100 rounded p-2 my-2 w-2/4 "
                    />

                    <label htmlFor="source">Source</label>
                    <Field
                      id="source"
                      name="source"
                      placeholder="Enter cook time"
                      className="bg-stone-100 rounded p-2 my-2 w-2/4 "
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
              {sentData.header_image ? (
                <div className="w-1/6">
                  <Image
                    className="rounded-3xl"
                    loader={() => sentData.header_image}
                    src={sentData.header_image}
                    unoptimized={true}
                    width="10%"
                    height="10%"
                    layout="responsive"
                    objectFit="contain"
                  />
                </div>
              ) : null}
              <div className="flex flex-col">
                <div className="text-xl font-bold">{sentData.title}</div>
                {sentData.avg_rating ? (
                  <div className="text-lg font-semibold">
                    {sentData.avg_rating.toFixed(2)}{" "}
                    {sentData.avg_rating
                      ? getStars(sentData.avg_rating)
                      : "N/A"}{" "}
                    - ({sentData.reviews.length})
                  </div>
                ) : (
                  <div>No rating</div>
                )}
              </div>
              <div className="rounded p-1 bg-stone-200 w-1/6">
                <div>Favorited {sentData.num_likes} times</div>
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
              <div className="bg-white my-5 p-2 rounded">
                <div className="text-xl">Comments:</div>

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
                              className="bg-stone-100 rounded p-2 my-2 w-2/4 "
                            />

                            <div className="flex flex-row items-end ">
                              <button
                                className="bg-stone-400 p-2 mr-3 my-2 rounded text-white font-semibold w-1/6"
                                onClick={() =>
                                  setShowRate((showRate) => !showRate)
                                }
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="bg-emerald-400 p-2 my-2 rounded text-white font-semibold w-1/6"
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
                        onClick={() => setShowRate((showRate) => !showRate)}
                      >
                        Rate
                      </button>
                    )}
                    {comment ? (
                      <div>
                        <Formik
                          initialValues={{
                            user: userID,
                            title: "",
                            content: "",
                            recipe: sentData.id,
                          }}
                          onSubmit={(values) => {
                            fetch(`/api/account/post_comment`, {
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
                            <label htmlFor="title" className=" rounded text-xl">
                              Title
                            </label>
                            <Field
                              id="title"
                              name="title"
                              placeholder="Enter a comment title"
                              className="bg-stone-100 rounded p-2 my-2 w-2/4 "
                            />
                            <label
                              htmlFor="content"
                              className=" rounded text-xl"
                            >
                              Content
                            </label>
                            <Field
                              id="content"
                              name="content"
                              placeholder="Give a description"
                              className="bg-stone-100 rounded p-2 my-2 w-2/4 "
                            />

                            <div className="flex flex-row items-end ">
                              <button
                                className="bg-stone-400 p-2 mr-3 my-2 rounded text-white font-semibold w-1/6"
                                onClick={() =>
                                  setComment((comment) => !comment)
                                }
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="bg-emerald-400 p-2 my-2 rounded text-white font-semibold w-1/6"
                              >
                                Submit
                              </button>
                            </div>
                          </Form>
                        </Formik>
                      </div>
                    ) : (
                      <button
                        className="bg-stone-400 p-2 rounded text-white font-semibold ml-4"
                        onClick={() => setComment((comment) => !comment)}
                      >
                        Comment
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
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
