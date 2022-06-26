import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../hocs/Layout";
import { logout } from "../actions/auth";
import { API_URL } from "../config";
import Link from "next/link";
import { useState } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [success, setSuccess] = useState(false);
  const [reset, setReset] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth?.user);
  const loading = useSelector((state) => state.auth.loading);
  const userID = useSelector((state) => state.auth.user?.id);

  const [firstName, setFirstName] = useState("");

  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    password2: "",
  });

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

  const onSubmit = async (e) => {
    e.preventDefault();

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
      console.log(token.token);

      const res2 = await fetch(`${API_URL}/auth/change_password/${userID}/`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res2.status === 200) {
        setSuccess(!success);
        setReset(!reset);
      }
    } catch (err) {
      console.log("failed at profile.js catch");
    }
  };

  const onSubmitFirstName = async (e) => {
    e.preventDefault();

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

      const res2 = await fetch(`${API_URL}/auth/update_profile/${userID}/`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name: firstName, email: user.email }),
      });

      if (res2.status === 200) {
        setSuccess(!success);
        setReset(!reset);
        router.reload(window.location.pathname);
      }
    } catch (err) {
      console.log("failed at profile.js catch");
    }
  };

  if (typeof window !== "undefined" && !loading && !isAuthenticated)
    router.push("/about");

  return (
    <Layout title="CookBook | profile">
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3">
          {user !== null && user.first_name === "" ? (
            <div className="flex flex-col items-center">
              <div className="text-3xl my-8">Welcome to CookBook!</div>
              <div className="text-2xl">Whats your name?</div>
              <div>
                <label htmlFor="first_name">
                  {/* <p>Enter Your Name Below</p> */}
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter Your Name"
                  onChange={onFirstNameChange}
                  value={firstName}
                  required
                  className="p-2 bg-stone-100 rounded mt-8"
                />
                {firstName && firstName.length < 2 ? (
                  <div className="text-red-400 mt-4 text-normal">
                    Enter your name!
                  </div>
                ) : null}
              </div>
              {firstName.length > 1 ? (
                <button
                  className="text-lg m-6 py-2 px-3 rounded-lg bg-pink-600 text-white"
                  onClick={onSubmitFirstName}
                >
                  Next
                </button>
              ) : (
                <p
                  className="text-lg m-6 py-2 px-3 rounded-lg bg-stone-200 cursor-default "
                  // onClick={onSubmitFirstName}
                >
                  Next
                </p>
              )}
            </div>
          ) : (
            <div>
              <div className="bg-stone-100 rounded-lg p-2">
                <p className="text-2xl m-6 underline">User Profile</p>

                <p className="text-lg m-6">
                  Welcome, {user !== null && user.first_name}!
                </p>
              </div>

              {/* {console.log("user1:::::", user?.favorite_recipes)} */}
              <p className="text-lg m-6">Your favorites</p>
              <div className="flex flex-col ">
                {user?.favorite_recipes ? (
                  user.favorite_recipes.map((d) => {
                    // console.log("user2:::::", user.favorite_recipes);

                    // console.log("favorites:::::", d.liked_recipe);
                    // console.log("data id:::::", d.id);

                    return (
                      <Link href={"/recipes/" + d.liked_recipe}>
                        <a
                          className="text-lg underline bg-stone-100 rounded p-2 my-2 w-1/4 items-center"
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
              {/* <p className="text-lg m-6">
            Days since joined: {user.days_since_joined}
          </p> */}

              <p className="text-lg m-6">Recently Viewed</p>
              {success ? <div>Changed Password Successfully!</div> : null}
              {!reset ? (
                <button
                  className="text-lg m-6 py-2 px-3 rounded-lg bg-stone-200"
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
                      onClick={onSubmit}
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
              <p className="text-lg m-6">Settings</p>
              <a
                className="text-lg m-6 py-2 px-3 rounded-lg bg-stone-200"
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

// // This gets called on every request
// export async function getServerSideProps(context) {
//   const id = context.query.id; // Get ID from slug `/book/1`
//   // If routing to `/book/1?name=some-book`
//   // Outputs: `{ id: '1', name: 'some-book' }`

//   // Fetch data from external API
//   const res = await fetch(`${API_URL}/user`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { data } };
// }

export default Profile;
