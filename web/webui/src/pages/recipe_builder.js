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
  const [sliderValue, setSliderValue] = useState(33);

  const [updated, setUpdated] = useState(false);
  const router = useRouter();
  const userID = useSelector((state) => state.auth.user?.id);

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

  const onSliderValueChange = (e) => {
    setSliderValue(e.target.value);
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
      // console.log(token.token);

      const res2 = await fetch(`${API_URL}/recipe/`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token.token,
        },
        body: formData,
      });
      const gotBack = await res2.json();

      if (res2.status === 201) {
        setUpdated(!updated);
        // console.log("SUCCESS RECIPE ADDED AYY");
        router.push(`/recipes/${gotBack.id}/`);
      }
    } catch (err) {
      console.log("failed at file_test.js catch");
    }
  };

  return (
    <Layout title="CookBook | Add Recipe">
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col items-center my-10">
            <p className="text-3xl my-6">Create Recipe</p>
          </div>
          <div className="px-6 flex flex-col">
            <form onSubmit={onSubmit} className="">
              <div className="flex flex-row ">
                <div className="flex flex-col">
                  <label htmlFor="image">
                    <p className="text-lg p-2 w-full rounded my-2">Image</p>
                  </label>
                  <label htmlFor="title">
                    <p className="text-lg p-2 w-full rounded my-2">Name</p>
                  </label>
                  <label htmlFor="description">
                    <p className="text-lg p-2 w-full rounded mt-2 mb-4">
                      Description
                    </p>
                  </label>
                  <label htmlFor="total_cook_time">
                    <p className="text-lg p-2 w-full rounded my-2">Cook Time</p>
                  </label>
                  <label htmlFor="price">
                    <p className="text-lg p-2 w-full rounded my-2">Price</p>
                  </label>
                  {/* <label htmlFor="private">
                    <p className="text-lg p-2 w-full rounded my-2">Private</p>
                  </label> */}
                </div>
                <div className="flex flex-col w-full ml-8">
                  <input
                    type="file"
                    name="image"
                    onChange={onFileChange}
                    required
                    // className="p-2 bg-stone-100 w-full rounded my-2"
                    className="block w-full text-sm text-black 
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-stone-100
      hover:file:bg-pink-600 my-3 hover:file:text-white hover:file:cursor-pointer"
                  />
                  <input
                    type="text"
                    name="title"
                    onChange={onTitleChange}
                    placeholder="Recipe Name"
                    required
                    className="p-2 bg-stone-100 w-full rounded my-2"
                  />
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Recipe description"
                    onChange={onDescriptionChange}
                    value={description}
                    required
                    className="pt-2 pl-2 bg-stone-100 w-full rounded my-2"
                  />
                  <input
                    type="number"
                    name="total_cook_time"
                    placeholder="Cook time"
                    onChange={onCookTimeChange}
                    value={cookTime}
                    required
                    className="p-2 bg-stone-100 w-full rounded my-2"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={onPriceChange}
                    value={price}
                    required
                    className="p-2 bg-stone-100 w-full rounded my-2"
                  />
                  {/* <p>slide value: {sliderValue}</p> */}
                  <input
                    type="range"
                    min="33"
                    max="99"
                    step="33"
                    value={sliderValue}
                    onChange={onSliderValueChange}
                    className="form-range h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer w-1/2 mt-6"
                    // appearance-none
                    // w-1/2
                    //       h-6
                    //       // p-0
                    //       // bg-transparent
                    //       // focus:outline-none focus:ring-0 focus:shadow-none"
                  />
                  <div className="w-1/2 flex justify-between text-lg font-semibold  px-1">
                    <span>$ &nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span></span>
                    <span>$$</span>
                    <span></span>
                    <span>$$$</span>
                  </div>
                  {/* <input type="checkbox" className=" bg-stone-100" checked /> */}
                </div>
              </div>
              <div className="flex flex-col items-center mt-8">
                {title && description && image && price ? (
                  <button
                    className="p-2 mt-4 bg-pink-600 rounded text-white w-2/5"
                    type="submit"
                  >
                    Create Recipe!
                  </button>
                ) : (
                  <p
                    className="p-2 bg-stone-400 rounded cursor-default w-1/4 text-white"
                    type="submit"
                  >
                    Fill out all required fields
                  </p>
                )}
              </div>
            </form>
            {updated ? <div>Submitted recipe!</div> : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddRecipePage;
