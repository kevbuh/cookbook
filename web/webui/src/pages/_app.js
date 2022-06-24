import "../../styles/globals.css"; // need to keep this or else tailwind will break
import Head from "next/head";
import { Provider } from "react-redux";
import { useStore } from "../store";

const App = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Head>
        <title>CookBook, the Food Platform</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
