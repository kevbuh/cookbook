import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";

function NavBar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(logout());
    }
  };

  const authLinks = (
    <>
      <Link href="/dashboard">
        <a
          className={
            router.pathname === "/dashboard"
              ? "text-xl font-semibold justify-center"
              : "text-xl font-medium justify-center"
          }
        >
          Dashboard
        </a>
      </Link>

      <a
        className={
          router.pathname === "/signup"
            ? "text-xl font-semibold justify-center"
            : "text-xl font-medium justify-center"
        }
        href="#!"
        onClick={logoutHandler}
      >
        Logout
      </a>
    </>
  );

  const guestLinks = (
    <>
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
    <div className="flex flex-row py-1.5 px-4">
      <div className="text-3xl font-medium py-2 w-1/3">
        <Link href="/">
          <a>CookBook</a>
        </Link>
      </div>

      <div className="w-1/3">
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
              className="block p-4 pl-10 w-full text-sm text-black rounded-lg dark:bg-stone-200 "
              placeholder="Search Recipes, Ingredients..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-stone-800 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-zinc-400"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/3 justify-center grid grid-cols-3 content-evenly ml-8 ">
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
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </div>
  );
}

export default NavBar;
