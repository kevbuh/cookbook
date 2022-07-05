import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import Layout from "../../hocs/Layout";
import { useSelector } from "react-redux";
import Image from "next/image";
import { API_URL } from "../../config/index";
import { useQuery } from "react-query";

const SelectedRecipePage = () => {
  const { query } = useRouter();
  const router = useRouter();

  const fetchThisRecipe = async () => {
    const res = await fetch(`http://127.0.0.1:8000/recipe/${query.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    return data;
  };

  const {
    isLoading,
    isError,
    data: sentData,
    error,
  } = useQuery(["recipe", query.id], fetchThisRecipe, {
    enabled: !!query.id,
  });

  const [showEdit, setShowEdit] = useState(false);
  const [showRate, setShowRate] = useState(false);

  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState(false);

  const userID = useSelector((state) => state.auth.user?.id);
  const user = useSelector((state) => state.auth?.user);

  const [image, setImage] = useState(sentData?.image);
  const [title, setTitle] = useState(sentData?.title);
  const [description, setDescription] = useState(sentData?.description);
  const [cookTime, setCookTime] = useState(sentData?.total_cook_time);
  const [price, setPrice] = useState(sentData?.price);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (user) {
      user.favorite_recipes.map((d) => {
        if (sentData?.id === d["liked_recipe"]) {
          setLiked(true);
        }
      });
    }
  }, [user]);

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
    formData.append("title", title);
    formData.append("description", description);
    formData.append("total_cook_time", cookTime);
    formData.append("author", userID);

    try {
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

      const res2 = await fetch(`${API_URL}/recipe/${sentData.id}/`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token.token,
          Accept: "application/json",
          // "Content-Type": "multipart/form-data", // DON'T PUT THIS IT DOESN'T WORK IF YOU DO
        },
        body: formData,
      });
      if (res2.status === 200) {
        setUpdated(!updated);
      }
      router.reload(window.location.pathname);
    } catch (err) {
      console.log("failed at [id] catch");
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Layout title={"CookBook | Recipe: " + sentData?.id}>
      <div className="flex justify-center w-3/4 mx-auto">
        <div
          className={
            isLoading ? " my-10 w-full animate-pulse" : " my-10 w-full "
          }
        >
          {showEdit ? (
            <div>
              <div className="p-6 flex flex-col">
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
              <div className="">
                <div className="flex flex-row justify-between">
                  <div className="my-auto h-full">
                    <div className="text-4xl mb-4">{sentData?.title}</div>
                    <div className="flex flex-row justify-evenly">
                      {sentData?.category.map((d) => (
                        <div>
                          <button className="border-stone-100 mx-2 border-2 rounded-2xl py-1 px-5 ">
                            {d.name}
                          </button>
                        </div>
                      ))}

                      <button className="border-stone-100 mx-2 border-2 rounded-2xl py-1 px-5 ">
                        {sentData?.num_views} views
                      </button>
                    </div>
                    <div className="flex flex-col my-5">
                      <div className=" flex flex-row items-center">
                        <p className="text-2xl mr-1">Time </p>
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className=" text-lg">
                        <p>{sentData?.total_cook_time} mins</p>
                      </div>
                      <div className="stat-desc">Community Average</div>
                    </div>
                    <div className="my-5">
                      <p className="text-2xl mr-1">Rating </p>
                      {sentData?.avg_rating ? (
                        <p className="text-lg">
                          {sentData.avg_rating.toFixed(2)}{" "}
                          {sentData.avg_rating
                            ? getStars(sentData.avg_rating)
                            : "No rating"}{" "}
                        </p>
                      ) : (
                        <p>No ratings yet!</p>
                      )}

                      <div className="stat-desc">
                        <div>
                          {sentData?.num_likes} Saves, (
                          {sentData?.reviews.length}) Reviews
                        </div>
                        <div>
                          <>
                            {userID && userID === sentData?.author ? (
                              <>
                                <button
                                  className="bg-stone-200 p-2 mx-3 my-2 rounded font-semibold"
                                  onClick={() =>
                                    setShowEdit((showEdit) => !showEdit)
                                  }
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
                                    }).catch((error) =>
                                      console.log("error", error)
                                    );
                                    router.push("/dashboard");
                                  }}
                                >
                                  Delete Recipe
                                </button>
                              </>
                            ) : (
                              <>
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
                                          .then(() =>
                                            router.reload(
                                              window.location.pathname
                                            )
                                          )
                                          .catch((error) =>
                                            console.log("error", error)
                                          );
                                      }}
                                    >
                                      <Form className="p-3  flex flex-col rounded bg-stone-200  mt-6">
                                        <label
                                          htmlFor="rate"
                                          className=" text-xl"
                                        >
                                          Rate this recipe below:
                                        </label>
                                        <Field
                                          id="rate"
                                          name="rate"
                                          placeholder="Give a rating 1-5 stars"
                                          className="bg-stone-100 rounded p-2 my-2 "
                                        />

                                        <div className="flex flex-row justify-between pr-1">
                                          <button
                                            className="font-semibold "
                                            onClick={() =>
                                              setShowRate(
                                                (showRate) => !showRate
                                              )
                                            }
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className=" font-semibold"
                                          >
                                            Submit
                                          </button>
                                        </div>
                                      </Form>
                                    </Formik>
                                  </div>
                                ) : (
                                  <button
                                    className=" font-semibold"
                                    onClick={() =>
                                      setShowRate((showRate) => !showRate)
                                    }
                                  >
                                    Rate
                                  </button>
                                )}
                              </>
                            )}
                          </>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col my-5">
                      <p className="text-2xl mr-1">Cost </p>

                      <div className=" text-lg">{sentData?.price}</div>
                      <div className="stat-desc">Estimated Ingredient Cost</div>
                    </div>
                    <div className="flex flex-row mx-auto justify-center border rounded">
                      {userID && userID === sentData?.author ? null : (
                        <button
                          className={
                            liked
                              ? "bg-pink-600 text-black w-full rounded"
                              : null
                          }
                          onClick={() => {
                            fetch("/api/account/like_recipe", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                liked_recipe: sentData?.id,
                                user: userID,
                              }),
                            }).catch((error) => console.log("error", error));
                            // router.push("/");
                            setLiked((liked) => !liked);
                          }}
                        >
                          {userID && userID === sentData?.author ? null : (
                            <div className="flex justify-center items-center p-2">
                              {user?.favorite_recipes.includes(sentData?.id) ||
                              liked ? (
                                <div className="text-white">
                                  <p className="text-xl">Saved!</p>
                                  {console.log("HERE")}
                                </div>
                              ) : (
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
                              )}
                            </div>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {sentData?.image ? (
                    <div className="w-3/5">
                      <Image
                        // className="rounded-3xl shadow p-2"
                        loader={() => sentData.image}
                        src={sentData.image}
                        unoptimized={true}
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                        priority="true"
                        quality={50}
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="rounded py-2">
                {sentData?.private ? (
                  <p className="text-xl">Private Recipe </p>
                ) : null}
                <div className="text-2xl mt-6 w-full">Ingredients</div>
                {sentData?.ingredient_list ? (
                  <div className="w-full">
                    <div className="my-2 rounded border shadow p-3 divide-y whitespace-pre-line w-full">
                      {sentData.ingredient_list}
                    </div>
                  </div>
                ) : (
                  <div className="text-xl mt-6">No ingredients listed</div>
                )}
                <p className="text-2xl mt-6">Directions</p>

                <div className="mb-4  my-2 border rounded p-3 shadow w-full">
                  <p className="text-medium whitespace-pre-line">
                    {sentData?.description}
                  </p>
                  <div className="text-xs mt-1">
                    Created {sentData?.created}
                  </div>
                </div>
                {sentData?.source ? (
                  <div>
                    Source:
                    <a className="text-xs">{sentData?.source}</a>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          <div>
            <div className="text-2xl w-full">Comments</div>
            <div>
              {sentData?.comments.length > 0 ? (
                <div>
                  {sentData?.comments.map((d) => (
                    <div className="my-2 rounded border shadow p-3">
                      <p>{d.content}</p>
                      <p className="text-sm">- {d.created}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xl mt-6">No Comments</div>
              )}
            </div>
            <div>
              {comment ? (
                <div className="mt-6">
                  <Formik
                    initialValues={{
                      user: userID,
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
                        .then(() => router.reload(window.location.pathname))
                        .catch((error) => console.log("error", error));
                      // router.reload(window.location.pathname);
                    }}
                  >
                    <Form className="py-3 pl-3 flex flex-col  rounded bg-stone-100  mt-6">
                      <label htmlFor="content" className=" rounded text-xl">
                        Comment
                      </label>
                      <Field
                        id="content"
                        name="content"
                        placeholder="Comment here"
                        className="bg-stone-100 rounded p-2 my-2"
                      />

                      <div className="flex flex-row items-end ">
                        <button
                          className="bg-stone-400 p-2 mr-3 my-2 rounded text-white font-semibold "
                          onClick={() => setComment((comment) => !comment)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-pink-600 p-2 my-2 rounded text-white font-semibold "
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              ) : (
                <button
                  className="p-2 rounded-lg border shadow font-semibold text-medium"
                  onClick={() => setComment((comment) => !comment)}
                >
                  Comment
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col my-10">
            <div className="flex flex-row items-center ">
              <p className="text-2xl pb-1 border-b-2 w-full">
                Recipes Like This{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SelectedRecipePage;
