import React from "react";
import Link from "next/link";

function NavBar() {
  return (
    <div className="flex flex-row py-1.5 px-4">
      <div className="text-3xl font-medium py-2 w-2/3">
        <Link href="/">
          <a>CookBook</a>
        </Link>
      </div>
      <div className="w-1/3">
        <form>
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-zine-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block p-4 pl-10 w-full text-sm text-black rounded-lg dark:bg-stone-200 "
              placeholder="Search Recipes, Ingredients..."
              required
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-stone-800 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-zinc-400"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NavBar;
