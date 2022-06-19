import Head from "next/head";
import NavBar from "../components/NavBar";
import { useState } from "react";
import AddRecipe from "../components/AddRecipe";

export default function Home({ data }) {
  const [showList, setShowList] = useState(false);

  return (
    <div>
      <Head>
        <title>CookBook Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <NavBar />

      <AddRecipe />
      <br></br>
      <div className="px-6">Edit</div>
      <div className="px-6">Delete</div>

      <button
        className="p-6"
        onClick={(e) => setShowList((showList) => !showList)}
      >
        Show List
      </button>
      {showList ? (
        <div>
          {data.map((d) => (
            <div key={d.id} className="px-6 py-1">
              <p>Title: {d.title}</p>
              <p>CookTime: {d.total_cook_time}</p>
              <p>Description: {d.description}</p>
              <br></br>
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
