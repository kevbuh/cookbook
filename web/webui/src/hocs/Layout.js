import Head from "next/head";
import NavBar from "../components/NavBar";

function Layout({ title, content, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      <NavBar />
      <div>{children}</div>
    </>
  );
}

Layout.defaultProps = {
  title: "CookBook",
  content: "CookBook Default Prop Description",
};

export default Layout;
