import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import NavBar from "../components/NavBar";
import AddRecipe from "../components/AddRecipe";
import Layout from "../hocs/Layout";

export default function Home({ data }) {
  const [showList, setShowList] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  // console.log("ID:", data.id);
  // console.log(" TITLE:", data.title);

  return (
    <Layout title="CookBook | Home" content="CookBook Home">
      <button
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
      ) : null}
    </Layout>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://127.0.0.1:8000/recipe/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      "User-Agent": "*",
      Authorization:
        "Bearer " +
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NzYwNTIwLCJpYXQiOjE2NTU3NTg3MjAsImp0aSI6IjU3NjcxMDJlNmNmYjQ3Yjg4Mjg0YjJlYjAxMjZmMGQyIiwidXNlcl9pZCI6MX0.Pd1cgrdCnelSXWNFajfG-jT1PVNYMQZmumXzX5U5C4k",
    },
  });
  // console.log("RES", res);

  const data = await res.json();
  // console.log("DATA", data);
  // Pass data to the page via props
  return { props: { data } };
}
