import Head from "next/head";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { request_refresh, check_auth_status } from "../actions/auth";
import Footer from "../components/Footer";

function Layout({ title, content, children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(check_auth_status());
    // dispatch(request_refresh()); use for special pages like a checkout
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "CookBook",
  content: "CookBook Default Prop Description",
};

export default Layout;
