import { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import Layout from "../../hocs/Layout";
import { useSelector } from "react-redux";
import Image from "next/image";
import { API_URL } from "../../config/index";

function SelectedRecipe(data) {
  const sentData = data.data;
  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [newFile, setNewFile] = useState(false);

  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState(false);

  const userID = useSelector((state) => state.auth.user?.id);

  const [image, setImage] = useState(sentData.image);
  const [title, setTitle] = useState(sentData.title);
  const [description, setDescription] = useState(sentData.description);
  const [cookTime, setCookTime] = useState(sentData.total_cook_time);
  const [price, setPrice] = useState(sentData.price);
  const [updated, setUpdated] = useState(false);

  console.log(sentData);

  const getStars = (num_stars) => {
    const steps = [];
    for (let i = 1; i <= num_stars; i++) {
      steps.push("⭐️");
    }
    return steps;
  };

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onCookTimeChange = (e) => {
    setCookTime(e.target.value);
  };

  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("total_cook_time", cookTime);
    formData.append("price", price);
    formData.append("author", userID);

    try {
      // console.log("SENT");
      // console.log("sending:::", title, userID, sentData.id);
      // console.log("UPDATING RECIPE");
      const res = await fetch(`/api/account/file_test`, {
        // gets the user token
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const token = await res.json();
      console.log(token.token);
      console.log(`${API_URL}/recipe/${sentData.id}/`);

      const res2 = await fetch(`${API_URL}/recipe/${sentData.id}/`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token.token,
          Accept: "application/json",
          // "Content-Type": "multipart/form-data", // DON'T PUT THIS IT DOESN'T WORK IF YOU DO
        },
        body: formData,
      });
      // const data = await apiRes.json();
      // console.log("MADE IT PAST RES2", data);
      // console.log("got this ststus:", res2.status);
      if (res2.status === 200) {
        setUpdated(!updated);
        console.log("SUCCESS RECIPE UPDATED AYY");
      }
      // setShowEdit((showEdit) => !showEdit);
      router.reload(window.location.pathname);
    } catch (err) {
      console.log("failed at [id] catch");
    }
  };

  return (
    <Layout title={"CookBook | Recipe: " + sentData.id}>
      <div className=" flex flex-col justify-self-center self-center items-center">
        <div className="w-2/3 my-10">
          {showEdit ? (
            <div>
              <div className="p-6 flex flex-col">
                {/* <Formik
                  initialValues={{
                    author: userID,
                    title: sentData.title,
                    description: sentData.description,
                    // image: sentData.image,
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
                    /> */}

                {/* <label htmlFor="description">Description</label>
                <Field
                  id="description"
                  name="description"
                  placeholder="Description"
                  className="bg-stone-100 rounded p-2 my-2 w-2/4 "
                /> */}

                {/* <label htmlFor="image">Image</label>
                    <Field
                      id="image"
                      name="image"
                      placeholder="Enter image URL"
                      className="bg-stone-100 rounded p-2 my-2 w-2/4 "
                    /> */}

                {/* <label htmlFor="cook_time">Cook Time</label>
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
                </Formik> */}
                <form onSubmit={onSubmit}>
                  <div>
                    <label htmlFor="title">Recipe Name</label>
                    <input
                      type="text"
                      name="title"
                      onChange={onTitleChange}
                      value={title}
                      required
                      className="p-2 ml-2 "
                    />
                  </div>
                  <div>
                    <label htmlFor="description">
                      <strong>Description*</strong>
                    </label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      onChange={onDescriptionChange}
                      value={description}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="total_cook_time">
                      <strong>total_cook_time*</strong>
                    </label>
                    <input
                      type="number"
                      name="total_cook_time"
                      placeholder="total_cook_time"
                      onChange={onCookTimeChange}
                      value={cookTime}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="price">
                      <strong>price*</strong>
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="price"
                      onChange={onPriceChange}
                      value={price}
                      required
                    />
                  </div>
                  {/* {!newFile ? (
                    <button onClick={() => setNewFile((newFile) => !newFile)}>
                      Edit Photo
                    </button>
                  ) : (
                    <div>
                      <div>
                        <label htmlFor="image">Image Upload</label>
                        <input
                          type="file"
                          name="image"
                          onChange={onFileChange}
                          // value={image}
                          // src={`${image}`}
                          required
                          className="p-2 ml-2 "
                        />
                      </div>
                      <button onClick={() => setNewFile((newFile) => !newFile)}>
                        Cancel
                      </button>
                    </div>
                  )} */}
                  <div className="flex flex-row items-end ">
                    <button
                      className=" p-2 mr-3 my-2 rounded font-semibold w-1/6"
                      onClick={() => setShowEdit((showEdit) => !showEdit)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-pink-600 p-2 mr-3 my-2 rounded text-white font-semibold w-1/6"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
                {updated ? <div>Edited recipe!</div> : null}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-row mb-4 align-middle">
                <div className="text-4xl mr-4 ">{sentData.title}</div>
                {sentData.category.map((d) => (
                  <div>
                    <button className="border-stone-100 mx-2 border-2 rounded-2xl py-1 px-5 ">
                      {d.name}
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-row">
                {sentData.image ? (
                  <div className="w-1/2">
                    <Image
                      className="rounded-2xl my-4"
                      loader={() => sentData.image}
                      src={sentData.image}
                      unoptimized={true}
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                    />
                  </div>
                ) : null}

                <div className="stats stats-vertical shadow ml-8 border  ">
                  <div className="stat">
                    <div className="stat-title">Rating</div>
                    <div className="stat-value">
                      {sentData?.avg_rating ? (
                        <p>{sentData.avg_rating.toFixed(2)} ⭐️</p>
                      ) : (
                        <p>No ratings yet!</p>
                      )}
                    </div>
                    <div className="stat-desc">
                      {sentData.num_likes} Saves, ({sentData.reviews.length})
                      Reviews
                    </div>
                  </div>
                  {/* <div></div> */}
                  {/* <div className="stat"> */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="stat-title">Time</div>
                    <div className="stat-value">
                      {sentData.total_cook_time} mins
                    </div>
                    <div class="stat-desc">↗︎ 400 (22%)</div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="stat-title">Cost</div>
                    <div className="stat-value">${sentData.price}</div>
                    <div class="stat-desc">↘︎ 90 (14%)</div>
                  </div>

                  <button
                    className={liked ? "bg-pink-600" : null}
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
                    {userID && userID === sentData.author ? null : (
                      <div className=" flex justify-center items-center">
                        {!liked ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        ) : (
                          <div className="flex flex-col text-white">
                            {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                            </svg> */}
                            <p className="text-xl">Saved!</p>
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <div className="rounded py-2">
                {sentData.private ? (
                  <p className="text-xl">Private Recipe </p>
                ) : null}
                <div className="my-4 border rounded p-3 shadow w-6/12">
                  <p className="text-xl">Description</p>
                  <p className="text-lg">{sentData.description}</p>
                </div>
                {sentData.source ? <div>Source: {sentData.source}</div> : null}
                <div>Created at {sentData.created}</div>
              </div>
              <div className="">
                {userID && userID === sentData.author ? (
                  <>
                    <button
                      className="bg-stone-200 p-2 mx-3 my-2 rounded font-semibold"
                      onClick={() => setShowEdit((showEdit) => !showEdit)}
                    >
                      Edit Recipe
                    </button>
                    <button
                      className="bg-red-500 p-2 rounded text-white font-semibold"
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
                      Delete Recipe
                    </button>
                  </>
                ) : (
                  <div className="mt-6">
                    {showRate ? (
                      <div className="mb-4">
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
                          <Form className="py-3 pl-3 flex flex-col  w-1/2 rounded bg-stone-200  mt-6">
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
                                className="bg-stone-200 p-2 mr-3 my-2 rounded font-semibold w-1/6"
                                onClick={() =>
                                  setShowRate((showRate) => !showRate)
                                }
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="bg-pink-600 p-2 my-2 rounded text-white font-semibold w-1/6"
                              >
                                Submit
                              </button>
                            </div>
                          </Form>
                        </Formik>
                      </div>
                    ) : (
                      <button
                        className="bg-pink-600 p-2 rounded text-white font-semibold"
                        onClick={() => setShowRate((showRate) => !showRate)}
                      >
                        Rate
                      </button>
                    )}
                    {comment ? (
                      <div className="mt-6">
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
                              .then(() =>
                                router.reload(window.location.pathname)
                              )
                              .catch((error) => console.log("error", error));
                            // router.reload(window.location.pathname);
                          }}
                        >
                          <Form className="py-3 pl-3 flex flex-col  w-1/2 rounded bg-stone-100  mt-6">
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
                                className="bg-pink-600 p-2 my-2 rounded text-white font-semibold w-1/6"
                              >
                                Submit
                              </button>
                            </div>
                          </Form>
                        </Formik>
                      </div>
                    ) : (
                      <button
                        className="bg-pink-600 p-2 rounded text-white font-semibold ml-4"
                        onClick={() => setComment((comment) => !comment)}
                      >
                        Comment
                      </button>
                    )}
                  </div>
                )}
                <div className="text-xl mt-6">Comments</div>

                {sentData.comments.map((d) => (
                  <div className="my-2 rounded w-1/3 border shadow p-3">
                    <p className="text-lg">{d.title}</p>
                    <p>{d.content}</p>
                    <p className="text-sm">- {d.created}</p>
                  </div>
                ))}
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
