import React from "react";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/router";

function SelectedRecipe() {
  const { query } = useRouter();

  return (
    <div>
      <NavBar />
      <h1>Selected Recipe</h1>
      <p>{query.id}</p>
    </div>
  );
}

export default SelectedRecipe;
