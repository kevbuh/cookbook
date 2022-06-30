import Layout from "../hocs/Layout";
import { API_URL } from "../config/index";
import { useQuery, useMutation } from "react-query";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function groceryListPage() {
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

  const fetchMyGroceryList = async (token, id) => {
    const res2 = await fetch(`${API_URL}/grocerylist/${id}`, {
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
    isLoading: isLoadingGroceryList,
    isError: isErrorGroceryList,
    data: myGroceryList,
    error: errorGroceryList,
  } = useQuery(
    ["userGroceryList"],
    () => fetchMyGroceryList(myTokenData.token, myUserData.user.id),
    {
      enabled: !!myUserData,
    }
  );

  const sendCreateList = async (newList) => {
    console.log("mutation data:", newList, myTokenData.token);

    return fetch(`${API_URL}/grocerylist/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + myTokenData.token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newList), // dont forget to stringify
    });
  };

  const mutation = useMutation((newList) => {
    sendCreateList(newList);
  });

  // console.log("@@@@", myGroceryList);

  if (isErrorToken || errorGroceryList) {
    return <span>Error: {errorGroceryList.message}</span>;
  }

  return (
    <Layout>
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col items-center my-10">
            <p className="text-3xl my-6">Grocery List</p>
            <p>Forgot what you needed to buy?</p>
            <p>We'll help, input your groceries below!</p>
          </div>
          <div>
            {myGroceryList?.data == undefined
              ? "You have no grocery list! Do you want to create one?"
              : "You have a grocery list"}
          </div>
          <div>
            {mutation.isLoading ? (
              "Creating your grocery list..."
            ) : (
              <>
                {mutation.isError ? (
                  <div>An error occurred: {mutation.error.message}</div>
                ) : null}

                {mutation.isSuccess ? <div>Grocery List Added!</div> : null}

                <button
                  className="rounded p-2 bg-stone-100 mx-auto"
                  onClick={() => {
                    mutation.mutate({
                      author: myUserData.user.id,
                      content: "Add an item to your grocery list!",
                    });
                  }}
                >
                  Create List
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default groceryListPage;
