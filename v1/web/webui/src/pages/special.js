import Layout from "../hocs/Layout";
import { API_URL } from "../config/index";
import Link from "next/link";

function specialFeaturesPage() {
  return (
    <Layout>
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col items-center my-10">
            <p className="text-3xl my-6">CookBook Features</p>
            <p>Check these out</p>
          </div>
          <div className="grid grid-cols-3 h-1/2">
            <Link href="/grocerylist">
              <a className="text-2xl my-2 mx-auto">Grocery List</a>
            </Link>
            <Link href="/generator">
              <a className="text-2xl my-2 mx-auto">Recipe Generator</a>
            </Link>
            <Link href="/mealplanner">
              <a className="text-2xl my-2 mx-auto">Meal Planner</a>
            </Link>
          </div>
          {/* <div className=" flex flex-row gap h-80">
            <button className="border m-auto p-5 w-full h-1/2 rounded-lg hover:bg-pink-100">
              <p className="text-2xl">Salty</p>
            </button>
            <p className="flex items-center align-center justify-center mx-5">
              OR
            </p>
            <button className=" m-auto p-5 w-full h-1/2 rounded-lg border hover:bg-pink-100">
              <p className="text-2xl">Sweet</p>
            </button>
          </div> */}
        </div>
      </div>
    </Layout>
  );
}

export default specialFeaturesPage;
