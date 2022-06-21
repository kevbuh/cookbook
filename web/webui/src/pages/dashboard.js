import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layout from "../hocs/Layout";

const Dashboard = () => {
  const router = useRouter();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  // console.lof("USER:", user);
  const loading = useSelector((state) => state.auth.loading);

  if (typeof window !== "undefined" && !loading && !isAuthenticated)
    router.push("/login");

  return (
    <Layout title="CookBook | Dashboard">
      <p className="text-xl m-6">User Dashboard</p>
      <p className="text-xl m-6">Welcome, User #{user !== null && user.id}</p>
    </Layout>
  );
};

export default Dashboard;
