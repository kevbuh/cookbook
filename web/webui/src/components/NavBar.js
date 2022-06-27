import { useState, useEffect } from "react";
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

  const onSubmit = async (e) => {
    e.preventDefault();

    router.push(`/search_results?result=${searchField}`);

    // try {
    //   const res2 = await fetch(`/search_results?result=${searchField}`, {
    //     method: "POST",
    //     headers: {
    //       Authorization: "Bearer " + token.token,
    //     },
    //     body: formData,
    //   });

    //   const gotBack = await res2.json();

    //   if (res2.status === 200) {
    //     setUpdated(!updated);
    //   }
    // } catch (err) {
    //   console.log("failed at search_results.js catch");
    // }
  };

  // useEffect(() => {
  //   searchNotes();
  // }, [searchField]);

  const authLinks = (
    <>
      <Link href="/filter">
        <button className="m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Link>
      <Link href="/recipe_builder">
        {/* <a className="flex text-xl font-medium  justify-center items-center ">
          Add+
        </a> */}
        <button className="m-auto ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Link>
      <Link href="/profile">
        {/* <a className="flex text-xl font-medium  justify-center items-center">
          Account
        </a> */}
        <button className="m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Link>
    </>
  );

  const guestLinks = (
    <>
      {/* <Link href="/about">
        <a
          className={
            router.pathname === "/about"
              ? "text-xl font-semibold justify-center"
              : "text-xl font-medium justify-center"
          }
        >
          About
        </a>
      </Link> */}
      <Link href="/login">
        <a
          className={
            router.pathname === "/login"
              ? "ml-8 text-xl font-semibold justify-center"
              : "ml-8 text-xl font-medium justify-center"
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
      {isAuthenticated ? (
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
              {searchField.length > 1 ? (
                <button
                  onClick={onSubmit}
                  className="text-white absolute right-2.5 bottom-2.5 bg-stone-800 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-zinc-400"
                >
                  Search
                </button>
              ) : (
                <button className="text-white absolute right-2.5 bottom-2.5 bg-stone-800 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-zinc-400">
                  Search
                </button>
              )}
            </div>
            {/* {focused ? (
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
            ) : null} */}
          </form>
        </div>
      ) : null}
      <div className="justify-center w-1/6 grid grid-cols-3 content-evenly items-center">
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </div>
  );
}

export default NavBar;
