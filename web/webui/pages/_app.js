import "../styles/globals.css"; // need to keep this or else tailwind will break
import Head from "next/head";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Head>
        <title>CookBook, the one-stop shop for everything food</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
