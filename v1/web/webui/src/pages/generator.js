import Layout from "../hocs/Layout";
import { API_URL } from "../config/index";

function filter() {
  return (
    <Layout>
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col items-center my-10">
            <p className="text-3xl my-6">Recipe Generator</p>
            <p>Don't know what to cook?</p>
            <p>
              We'll help, select a choice below and we'll find a suggestion!
            </p>
          </div>
          <div className=" flex flex-row gap h-80">
            <button className="border m-auto p-5 w-full h-1/2 rounded-lg hover:bg-pink-100 ">
              <p className="text-2xl">Salty</p>
            </button>
            <p className="flex items-center align-center justify-center mx-5">
              OR
            </p>
            <button className=" m-auto p-5 w-full h-1/2 rounded-lg border hover:bg-pink-100">
              <p className="text-2xl">Sweet</p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default filter;
