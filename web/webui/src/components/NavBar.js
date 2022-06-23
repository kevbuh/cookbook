import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { API_URL } from "../config/index";

function NavBar() {
  const [data, setData] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [focused, setFocused] = useState(false);
  const onBlur = () => setFocused(false);
  const onFocus = () => setFocused(true);
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const searchNotes = () => {
    fetch(`${API_URL}/search/?search=${searchField}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then((json) => {
        // console.log("search result:", json);
        setData(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    searchNotes();
  }, [searchField]);

  const authLinks = (
    <>
      <Link href="/recipe_builder">
        <a className="flex text-xl font-medium  justify-center items-center ">
          Add+
        </a>
      </Link>
      <Link href="/profile">
        <a className="flex text-xl font-medium  justify-center items-center">
          Account
        </a>
      </Link>
    </>
  );

  const guestLinks = (
    <>
      <Link href="/about">
        <a
          className={
            router.pathname === "/about"
              ? "text-xl font-semibold justify-center"
              : "text-xl font-medium justify-center"
          }
        >
          About
        </a>
      </Link>
      <Link href="/login">
        <a
          className={
            router.pathname === "/login"
              ? "text-xl font-semibold justify-center"
              : "text-xl font-medium justify-center"
          }
        >
          Log In
        </a>
      </Link>
      <Link href="/signup">
        <a
          className={
            router.pathname === "/signup"
              ? "text-xl font-semibold justify-center"
              : "text-xl font-medium justify-center"
          }
        >
          Sign Up
        </a>
      </Link>
    </>
  );

  return (
    <div className="flex flex-row py-2 ">
      <div className="w-1/6 flex items-center justify-center">
        <Link href="/">
          <a className="text-2xl font-medium ">CookBook</a>
        </Link>
      </div>

      <div className="w-2/3">
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-zine-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-black rounded-lg dark:bg-stone-100 "
              placeholder="Search Recipes, Ingredients..."
              onChange={(e) => setSearchField(e.target.value)}
              onFocus={onFocus}
              onBlur={onBlur}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-stone-800 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-zinc-400"
            >
              Search
            </button>
          </div>
          {focused ? (
            <div className="flex flex-col bg-stone-200 z-10 ">
              {data.length > 0 ? (
                data.map((d) => {
                  return (
                    <Link href={"/recipes/" + d.id}>
                      <a key={d.id}>{d.title} </a>
                    </Link>
                  );
                })
              ) : (
                <p>No Search Results</p>
              )}
            </div>
          ) : null}
        </form>
      </div>

      <div className="justify-center w-1/6 grid grid-cols-2 content-evenly items-center">
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </div>
  );
}

export default NavBar;
