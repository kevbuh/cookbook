import "../../styles/globals.css"; // need to keep this or else tailwind will break
import Head from "next/head";
import { Provider } from "react-redux";
import { useStore } from "../store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const store = useStore(pageProps.initialReduxState);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>CookBook, the Food Platform</title>
          </Head>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
};

export default App;
