import { useState, useEffect } from "react";
import Link from "next/link";
import AddRecipe from "../components/AddRecipe";
import Layout from "../hocs/Layout";
import { API_URL } from "../config";

export default function Home({ data }) {
  const [showList, setShowList] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [sentData, setSentData] = useState(data);

  const getStars = (num_stars) => {
    const steps = [];
    for (let i = 1; i <= num_stars; i++) {
      steps.push("⭐️");
    }
    return steps;
  };

  return (
    <Layout title="CookBook | Home" content="CookBook Home">
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3">
          <div className="bg-stone-100 rounded-lg p-2">
            <p className="text-2xl my-2 ml-2 font-semibold">For You</p>
            <div className="grid grid-cols-4 ">
              {sentData.map((d) => (
                <div key={d.id} className="m-2 bg-zinc-200 rounded-lg  p-2">
                  <Link href={"/recipes/" + d.id}>
                    <a className="underline text-xl font-semibold">{d.title}</a>
                  </Link>
                  <p>Rating: {d.rating ? getStars(d.rating) : "N/A"}</p>
                  <p>Time: {d.total_cook_time} mins</p>
                  <p>Description: {d.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
{
  /* <button
  className="mx-6 bg-slate-400 p-2 rounded text-white font-semibold my-2"
  onClick={() => setShowAdd((showAdd) => !showAdd)}
>
  Add New Recipe
</button>
{showAdd ? <AddRecipe /> : null}
<br></br>

<button
  className="mx-6 bg-slate-400 p-2 rounded text-white font-semibold"
  onClick={() => setShowList((showList) => !showList)}
>
  Show All Recipes
</button>
{showList ? (
  <div>
    {data.map((d) => (
      <div
        key={d.id}
        className="mx-6 my-2 bg-zinc-200 rounded-lg w-1/4 p-2"
      >
        <Link href={"/recipes/" + d.id}>
          <a className="underline text-xl font-semibold">{d.title}</a>
        </Link>
        <p>Time: {d.total_cook_time} mins</p>
        <p>Description: {d.description}</p>
      </div>
    ))}
  </div>
) : null} */
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${API_URL}/recipe/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization:
      //   "Bearer " +
      //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NzYwNTIwLCJpYXQiOjE2NTU3NTg3MjAsImp0aSI6IjU3NjcxMDJlNmNmYjQ3Yjg4Mjg0YjJlYjAxMjZmMGQyIiwidXNlcl9pZCI6MX0.Pd1cgrdCnelSXWNFajfG-jT1PVNYMQZmumXzX5U5C4k",
    },
  });

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
