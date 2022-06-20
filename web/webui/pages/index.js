import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import NavBar from "../components/NavBar";
import AddRecipe from "../components/AddRecipe";

export default function Home({ data }) {
  const [showList, setShowList] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  // console.log("ID:", data.id);
  // console.log(" TITLE:", data.title);

  return (
    <div>
      <Head>
        <title>CookBook Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <NavBar />

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
    </div>
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
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1ODY1MzY2LCJpYXQiOjE2NTU2OTI1NjYsImp0aSI6ImJiYTZhOGUxODI0ZjQ0YmU5ODE3YzdhNzgwZTk3MDlhIiwidXNlcl9pZCI6Nn0.0y472OF5gdp4KO22lx5DrFFZjizSM6u8T0bsY4o-T_k",
    },
  });
  // console.log("RES", res);

  const data = await res.json();
  // console.log("DATA", data);
  // Pass data to the page via props
  return { props: { data } };
}
