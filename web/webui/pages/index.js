import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import NavBar from "../components/NavBar";
import AddRecipe from "../components/AddRecipe";

export default function Home({ data }) {
  const [showList, setShowList] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

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
              className="mx-6 my-2 bg-slate-200 rounded w-1/4 p-1"
            >
              <p>ID: {d.id}</p>
              <Link href={"/recipes/" + d.id}>
                <a>Title: {d.title}</a>
              </Link>
              <p>CookTime: {d.total_cook_time}</p>
              <p>Description: {d.description}</p>
              <button className="mr-2">Edit</button>
              <button
                onClick={() => {
                  fetch(`http://127.0.0.1:8000/recipes/${d.id}/`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                    .then(console.log("TRIED TO DELETE"))
                    .catch((error) => console.log("error", error));
                  Router.reload();
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://127.0.0.1:8000/recipes/`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
