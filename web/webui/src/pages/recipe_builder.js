import Layout from "../hocs/Layout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import { useState, useEffect } from "react";
import { API_URL } from "../config";

const AddRecipePage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [cookTime, setCookTime] = useState(null);
  const [price, setPrice] = useState(null);

  const [updated, setUpdated] = useState(false);
  const router = useRouter();
  const userID = useSelector((state) => state.auth.user?.id);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const config = {
  //       headers: {
  //         Accept: "application/json",
  //       },
  //     };

  //     try {
  //       const res = await fetch(`${API_URL}/fetch-images/`, config);

  //       if (res.status === 200) {
  //         setImages(res.data.images);
  //       }
  //     } catch (err) {}
  //   };

  //   fetchData();
  // }, [updated]);

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onCookTimeChange = (e) => {
    setCookTime(e.target.value);
  };

  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("total_cook_time", cookTime);
    formData.append("price", price);
    formData.append("author", userID);

    try {
      const res = await fetch(`/api/account/file_test`, {
        // gets the user token
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const token = await res.json();
      console.log(token.token);

      const res2 = await fetch(`${API_URL}/recipe/`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token.token,
        },
        body: formData,
      });

      if (res2.status === 201) {
        setUpdated(!updated);
        console.log("SUCCESS RECIPE ADDED AYY");
      }
    } catch (err) {
      console.log("failed at file_test.js catch");
    }
  };

  return (
    <Layout title="CookBook | Add Recipe">
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 bg-stone-100 rounded-lg p-2">
          <p className="text-2xl m-6 underline">Create Recipe</p>
          <div className="px-6 flex flex-col">
            {/* <Formik
              initialValues={{
                author: userID,
                title: "",
                description: "",
                // image: "",
                // total_cook_time: "",
                // price: "",
                // source: "",
              }}
              onSubmit={(values) => {
                fetch("/api/account/recipe/", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                })
                  .then((res) => {
                    res.json();
                    console.log("HERE IS WHAT WE GOT BACK:", res);
                  })
                  .catch((error) => console.log("error", error));
                router.push("/");
              }}
            >
              <Form className="flex flex-col">
                <label htmlFor="title">Title</label>
                <Field
                  id="title"
                  name="title"
                  placeholder="Title"
                  className="bg-slate-200 rounded p-1 my-2 w-2/4"
                />
                {console.log("GOT THIS ID:", userID)}

                <label htmlFor="description">Description</label>
                <Field
                  id="description"
                  name="description"
                  placeholder="Description"
                  className="bg-slate-200 rounded p-1 my-2 w-2/4"
                /> */}

            {/* <label htmlFor="image">Image</label>
                <Field
                  id="image"
                  name="image"
                  placeholder="Enter image URL"
                  className="bg-slate-200 rounded p-1 my-2 w-2/4"
                /> */}
            {/* 
                <label htmlFor="total_cook_time">Cook Time</label>
                <Field
                  id="total_cook_time"
                  name="total_cook_time"
                  placeholder="Enter cook time"
                  className="bg-slate-200 rounded p-1 my-2 w-2/4"
                />

                <label htmlFor="price">Price</label>
                <Field
                  id="price"
                  name="price"
                  placeholder="Enter cook time"
                  className="bg-slate-200 rounded p-1 my-2 w-2/4"
                />

                <label htmlFor="source">Source</label>
                <Field
                  id="source"
                  name="source"
                  className="bg-slate-200 rounded p-1 my-2 w-2/4"
                  placeholder="Enter source"
                /> */}

            {/* <button
                  type="submit"
                  className="rounded px-3  py-2 my-2 bg-pink-600 w-1/6 text-white font-medium"
                >
                  Submit
                </button>
              </Form>
            </Formik> */}
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="title">Recipe Name</label>
                <input
                  type="text"
                  name="title"
                  onChange={onTitleChange}
                  required
                  className="p-2 ml-2 "
                />
              </div>
              <div>
                <label htmlFor="description">
                  <strong>Description*</strong>
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  onChange={onDescriptionChange}
                  value={description}
                  required
                />
              </div>
              <div>
                <label htmlFor="total_cook_time">
                  <strong>total_cook_time*</strong>
                </label>
                <input
                  type="number"
                  name="total_cook_time"
                  placeholder="total_cook_time"
                  onChange={onCookTimeChange}
                  value={cookTime}
                  required
                />
              </div>
              <div>
                <label htmlFor="price">
                  <strong>price*</strong>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="price"
                  onChange={onPriceChange}
                  value={price}
                  required
                />
              </div>
              <div>
                <label htmlFor="image">Image Upload</label>
                <input
                  type="file"
                  name="image"
                  onChange={onFileChange}
                  required
                  className="p-2 ml-2 "
                />
              </div>
              <button className="p-2 mt-5 bg-emerald-400 rounded" type="submit">
                Create
              </button>
            </form>
            {updated ? <div>Submitted recipe!</div> : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddRecipePage;
