import React from "react";
import NavBar from "../components/NavBar";
import Layout from "../hocs/Layout";

function about() {
  return (
    <Layout>
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3">
          <div className="bg-stone-100 rounded-lg p-2">
            <p className="text-2xl m-6 underline">About Page</p>
          </div>
          <p className="text-lg m-6">
            CookBook is the one-stop shop for everything food.
          </p>
          <p className="text-lg m-6">
            Find recipes personalized to you and the best categories for your
            goals.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default about;
