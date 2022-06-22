import React from "react";
import Layout from "../hocs/Layout";
import AddRecipe from "../components/AddRecipe";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const AddRecipePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userID = useSelector((state) => state.auth.user.id);
  console.log("USERID:", userID);
  const loading = useSelector((state) => state.auth.loading);

  return (
    <Layout title="CookBook | Add Recipe">
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 bg-stone-100 rounded-lg p-2">
          <p className="text-2xl m-6 underline">Create Recipe</p>
          <AddRecipe userID={userID} />
        </div>
      </div>
    </Layout>
  );
};

export default AddRecipePage;
