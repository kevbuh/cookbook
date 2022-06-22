import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../hocs/Layout";
import { logout } from "../actions/auth";
import { API_URL } from "../config";
import Link from "next/link";

const Profile = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth?.user);
  const loading = useSelector((state) => state.auth.loading);

  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(logout());
    }
  };

  if (typeof window !== "undefined" && !loading && !isAuthenticated)
    router.push("/login");

  return (
    <Layout title="CookBook | profile">
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3">
          <div className="bg-stone-100 rounded-lg p-2">
            <p className="text-2xl m-6 underline">User Profile</p>

            <p className="text-lg m-6">
              Welcome, User #{user !== null && user.id}
            </p>
          </div>
          {console.log("user1:::::", user.favorite_recipes)}
          <p className="text-lg m-6">Your favorites:</p>
          <div className="flex flex-col ">
            {user.favorite_recipes ? (
              user.favorite_recipes.map((d) => {
                console.log("user2:::::", user.favorite_recipes);

                console.log("favorites:::::", d.liked_recipe);
                console.log("data id:::::", d.id);

                return (
                  <Link href={"/recipes/" + d.liked_recipe}>
                    <a
                      className="text-lg underline bg-stone-100 rounded p-2 my-2 w-1/4 items-center"
                      key={d.liked_recipe}
                    >
                      Recipe #{d.liked_recipe}{" "}
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

          <p className="text-lg m-6">Recently Viewed:</p>
          <p className="text-lg m-6">Settings:</p>
          <a
            className="text-lg m-6 py-2 px-3 rounded-lg bg-stone-200"
            href="#!"
            onClick={logoutHandler}
          >
            Logout
          </a>
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
