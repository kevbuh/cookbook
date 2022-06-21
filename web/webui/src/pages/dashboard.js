import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../hocs/Layout";
import { logout } from "../actions/auth";

const Dashboard = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(logout());
    }
  };

  if (typeof window !== "undefined" && !loading && !isAuthenticated)
    router.push("/login");

  return (
    <Layout title="CookBook | Dashboard">
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3">
          <div className="bg-stone-100 rounded-lg p-2">
            <p className="text-2xl m-6 underline">User Dashboard</p>
            <p className="text-lg m-6">
              Welcome, User #{user !== null && user.id}
            </p>
          </div>
          <p className="text-lg m-6">Your favorites:</p>
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

export default Dashboard;
