import Layout from "../hocs/Layout";
import { API_URL } from "../config/index";
import { useQuery, useMutation } from "react-query";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

const MyTextArea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-area" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

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

  if (isErrorToken) {
    return <span>Error: {isErrorToken.message}</span>;
  }

  if (isLoadingToken || isLoading2) {
    return (
      <Layout>
        <div className="flex flex-col align-center items-center justify-center h-3/4">
          <div className="m-auto animate-pulse h-full my-60">
            Loading your grocery list....
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className=" flex flex-col justify-self-center mx-6 my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col items-center my-10">
            <p className="text-3xl my-6">Grocery List</p>
            <p>Forgot what you needed to buy?</p>
            <p>We'll help, input your groceries below!</p>
          </div>
          <div>
            {myUserData.user.grocerylists == undefined ? (
              <>
                <div>
                  "You have no grocery list! Do you want to create one?"
                </div>
                <div>
                  {mutation.isLoading ? (
                    "Creating your grocery list..."
                  ) : (
                    <>
                      {mutation.isError ? (
                        <div>An error occurred: {mutation.error.message}</div>
                      ) : null}

                      {mutation.isSuccess ? (
                        <div>Grocery List Added!</div>
                      ) : null}

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
              </>
            ) : (
              <>
                <div>
                  <Formik
                    initialValues={{
                      content: myUserData.user.grocerylists[0].content,
                    }}
                    validationSchema={Yup.object({
                      content: Yup.string().max(255, "Too Long!"),
                    })}
                    // onSubmit={async (values, { setSubmitting }) => {
                    //   fetch(
                    //     `${API_URL}/auth/update_profile/${myUserData?.user.id}/`,
                    //     {
                    //       method: "PUT",
                    //       headers: {
                    //         Authorization: "Bearer " + myTokenData.token,
                    //         "Content-Type": "application/json",
                    //       },
                    //       body: JSON.stringify({
                    //         first_name: values.firstName,
                    //         email: myUserData?.user.email,
                    //         is_premium: myUserData?.user.is_premium,
                    //       }),
                    //     }
                    //   );
                    // }}
                  >
                    <Form>
                      <div className="rounded-lg bg-stone-100 p-8 flex flex-col items-center w-full">
                        {/* <label htmlFor="content"></label>
                        <Field as="select" name="color" />
                        <ErrorMessage name="content">
                          {(msg) => <p className="text-red-600">{msg}</p>}
                        </ErrorMessage> */}
                        <MyTextArea
                          // label="Your Grocery List"
                          name="content"
                          rows="6"
                          placeholder={myUserData.user.grocerylists[0].content}
                          className="rounded-lg p-8 flex flex-col items-center w-full"
                        />

                        {/* <button
                          type="submit"
                          className="text-lg m-6 py-2 px-3 rounded-lg bg-pink-600 text-white"
                        >
                          Continue
                        </button> */}
                      </div>
                    </Form>
                  </Formik>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default groceryListPage;
