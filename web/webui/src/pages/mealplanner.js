import Layout from "../hocs/Layout";
import { API_URL } from "../config/index";

function groceryListPage() {
  return (
    <Layout>
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col items-center my-10">
            <p className="text-3xl my-6">Meal Planner</p>
            <p>Need help planning?</p>
            <p>We'll help, input your meals below!</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default groceryListPage;
