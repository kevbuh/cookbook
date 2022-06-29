import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../hocs/Layout";
import { logout } from "../actions/auth";
import { API_URL } from "../config";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const [success, setSuccess] = useState(false);
  const [reset, setReset] = useState(false);

  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    password2: "",
  });

  const fetchMyToken = async () => {
    console.log("FETCHED TOKEN");
    const res = await fetch(`/api/account/file_test`, {
      // gets the user token
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    const token = await res.json();
    return token;
  };

  const fetchMyRecipes = async (token) => {
    const res2 = await fetch(`${API_URL}/my_recipes/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data2 = await res2.json();
    return data2;
  };

  const fetchMyUser = async (token) => {
    const res2 = await fetch(`${API_URL}/auth/user/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data2 = await res2.json();
    return data2;
  };

  const {
    isLoading: isLoadingToken,
    isError: isErrorToken,
    data: myTokenData,
    error: tokenError,
  } = useQuery(["userToken"], fetchMyToken);

  const {
    isLoading: isLoading2,
    isError: isError2,
    data: myUserData,
    error: error2,
  } = useQuery(["userData"], () => fetchMyUser(myTokenData.token), {
    enabled: !!myTokenData,
  });

  const {
    isLoading,
    isError,
    data: rqdata,
    error,
  } = useQuery(["userRecipes"], () => fetchMyRecipes(myTokenData.token), {
    enabled: !!myTokenData,
  });

  if (isLoading || isLoading2 || isLoadingToken) {
    return <span>Loading...</span>;
  }

  if (isErrorToken || isError || isError2) {
    return <span>Error: {tokenError.message}</span>;
  }

  const { old_password, password, password2 } = formData;

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(logout());
    }
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    console.log("HERE");

    try {
      const res = await fetch(`/api/account/file_test`, {
        // gets the user token
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const token = await res.json();
      console.log(token.token, myUserData.data.id);

      const res2 = await fetch(
        `${API_URL}/auth/change_password/${myUserData.data.id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res2.status === 200) {
        setSuccess(!success);
        setReset(!reset);
      }
    } catch (err) {
      console.log("failed at profile.js catch");
    }
  };

  if (typeof window !== "undefined" && !loading && !isAuthenticated)
    router.push("/about");

  return (
    <Layout title="CookBook | profile">
      <div className=" flex flex-col justify-self-center my-5 self-center items-center">
        <div className="w-2/3">
          {myUserData.user !== null &&
          myUserData.user !== undefined &&
          myUserData.user.first_name === "" ? (
            <div className="flex flex-col items-center">
              <div className="text-3xl my-8">Welcome to CookBook!</div>
              <div className="text-2xl">Enter your display name</div>
              <div>
                <Formik
                  initialValues={{ firstName: "" }}
                  validationSchema={Yup.object({
                    firstName: Yup.string()
                      .min(2, "Too Short!")
                      .max(50, "Too Long!")
                      .required("Required"),
                  })}
                  onSubmit={async (values, { setSubmitting }) => {
                    fetch(
                      `${API_URL}/auth/update_profile/${myUserData.user.id}/`,
                      {
                        method: "PUT",
                        headers: {
                          Authorization: "Bearer " + myTokenData.token,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          first_name: values.firstName,
                          email: myUserData.user.email,
                          is_premium: myUserData.user.is_premium,
                        }),
                      }
                    );

                    setSuccess(!success);
                    setReset(!reset);
                    setSubmitting(false);
                    router.reload(window.location.pathname);
                  }}
                >
                  <Form>
                    <div className="rounded-lg bg-stone-100 p-8 flex flex-col items-center">
                      <label htmlFor="firstName"></label>
                      <Field name="firstName" type="firstName" />
                      <ErrorMessage name="firstName">
                        {(msg) => <p className="text-red-600">{msg}</p>}
                      </ErrorMessage>

                      <button
                        type="submit"
                        className="text-lg m-6 py-2 px-3 rounded-lg bg-pink-600 text-white"
                      >
                        Continue
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-stone-100 rounded-lg p-2 flex flex-row items-center">
                {/* <p className="text-2xl m-6 underline">User Profile</p> */}
                <div>
                  <p className="text-2xl mt-6 mx-6 ">
                    Welcome,{" "}
                    {myUserData.user !== null &&
                      myUserData.user !== undefined &&
                      myUserData.user.first_name}
                    !
                  </p>
                  <p className="text-sm mb-6 mx-6">
                    Joined {myUserData.user.days_since_joined} days ago
                  </p>
                </div>
                <div className="w-8/12">
                  {myUserData.data?.is_premium ? (
                    <div>
                      <button className="px-2 py-4 bg-pink-600 text-white rounded m-auto w-full h-full">
                        Premium Member
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Link href="/premium">
                        <button className="px-2 py-4 bg-pink-600 text-white rounded m-auto w-full h-full">
                          Join Cook Book Premium
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* {console.log("user1:::::", user?.favorite_recipes)} */}
              <p className="text-lg m-6">Your favorites</p>
              <div className="flex flex-col ">
                {myUserData.user?.favorite_recipes ? (
                  myUserData.user.favorite_recipes.map((d) => {
                    return (
                      <Link href={"/recipes/" + d.liked_recipe}>
                        <a
                          // className="text-lg underline bg-stone-100 rounded p-2 my-2 w-1/4 items-center"
                          className="border-stone-100 mx-2 my-1 border-2 rounded-2xl py-1 px-3 ml-6 w-1/6"
                          key={d?.liked_recipe}
                        >
                          Recipe #{d?.liked_recipe}{" "}
                        </a>
                      </Link>
                    );
                  })
                ) : (
                  <p>No liked recipes!</p>
                )}
              </div>

              <p className="text-lg m-6">Recently Viewed</p>
              <p className="text-lg mt-6 mx-6 mb-1">Recipes You've Uploaded</p>
              {rqdata?.length > 0
                ? rqdata.map((d) => (
                    <div>
                      <Link href={"/recipes/" + d.id}>
                        <button className="border-stone-100 mx-2 my-1 border-2 rounded-2xl py-1 px-3 ml-6 ">
                          {d.title}
                        </button>
                      </Link>
                    </div>
                  ))
                : null}
              <p className="text-lg ml-6 mt-6 mb-2">Settings</p>

              {success ? <div>Changed Password Successfully!</div> : null}
              {!reset ? (
                <button
                  // className="text-lg m-6 py-2 px-3 rounded-lg bg-stone-200"
                  className="bg-stone-100 mx-2 my-1 rounded-2xl py-1 px-3 ml-6"
                  onClick={() => setReset((reset) => !reset)}
                >
                  Reset password
                </button>
              ) : (
                <div className="rounded bg-stone-100 p-3 w-1/2 items-center">
                  <div>
                    <label htmlFor="Old Password">
                      <p>Old Password</p>
                    </label>
                    <input
                      type="text"
                      name="old_password"
                      placeholder="Old Password"
                      onChange={onChange}
                      value={old_password}
                      required
                      className="p-2 bg-stone-200 rounded"
                    />
                    {old_password && old_password.length < 8 ? (
                      <div className="text-red-400 mt-4 text-normal">
                        Enter your old password
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="password">
                      <p>New Password</p>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="New password"
                      onChange={onChange}
                      value={password}
                      required
                      className="p-2 bg-stone-200 rounded"
                    />
                    {password && password.length < 8 ? (
                      <div className="text-red-400 mt-4 text-normal">
                        Must be 8 characters
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="password2">
                      <p>Confirm Password</p>
                    </label>
                    <input
                      type="password"
                      name="password2"
                      placeholder="Confirm Password"
                      onChange={onChange}
                      value={password2}
                      required
                      className="p-2 bg-stone-200 rounded"
                    />
                    {password2 && password2.length < 8 ? (
                      <div className="text-red-400 mt-4 text-normal">
                        Must be 8 characters
                      </div>
                    ) : null}
                  </div>
                  {password.length > 7 &&
                  password2.length > 7 &&
                  old_password.length > 7 ? (
                    <button
                      className="text-lg m-6 py-2 px-3 rounded-lg bg-pink-600 text-white"
                      onClick={onSubmitPassword}
                    >
                      Change Password
                    </button>
                  ) : (
                    <p
                      className="text-lg py-2 px-3 rounded-lg bg-stone-200 w-1/4 my-4"
                      onClick={() => setReset((reset) => !reset)}
                    >
                      Cancel
                    </p>
                  )}
                </div>
              )}
              <a
                // className="text-lg m-6 py-2 px-3 rounded-lg bg-stone-200"
                className="bg-stone-100 mx-2 my-1 rounded-2xl py-1 px-3 ml-6 mt-2"
                href="#!"
                onClick={logoutHandler}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// 394 before

export default Profile;
