import Link from "next/link";
import Layout from "../hocs/Layout";
import { API_URL } from "../config";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "react-query";
import React, { useRef, useEffect } from "react";

export default function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const router = useRouter();
  const myRef = useRef();

  const fetchAllRecipes = async ({ pageParam = 0 }) => {
    // console.log(pageParam);
    // console.log("log3", lastPage.next?.split("=")[1]);

    if (pageParam == 0) {
      const res = await fetch(`${API_URL}/recipe/`);
      return res.json();
    } else if (pageParam) {
      const res = await fetch(`${API_URL}/recipe/?cursor=${pageParam}`);
      return res.json();
    }
  };

  const {
    data: allRecipes,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("allRecipes", fetchAllRecipes, {
    getNextPageParam: (lastPage) => {
      lastPage.nextCursor = lastPage.next?.split("=")[1];
      return lastPage.nextCursor;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      console.log("entry", entry);
      fetchNextPage();
    });
    observer.observe(myRef.current);
  }, []);

  const getStars = (num_stars) => {
    const steps = [];
    for (let i = 1; i <= num_stars; i++) {
      steps.push("⭐️");
    }
    return steps;
  };

  if (typeof window !== "undefined" && !loading && !isAuthenticated)
    router.push("/");

  return (
    <Layout title="CookBook | Home" content="CookBook Home">
      <div className="flex justify-center">
        <div className=" flex flex-row w-11/12  align-self-center">
          <div className="w-full">
            <div className="rounded-xl p-2 shadow-lg ">
              <p className="text-2xl my-2 ml-2 font-medium">Recipes For You</p>
              <div
                className={
                  isFetchingNextPage
                    ? "grid grid-cols-4 animate-pulse"
                    : "grid grid-cols-4  "
                }
              >
                <>
                  {allRecipes?.pages.map((group, i) => (
                    <React.Fragment key={i}>
                      {group?.results?.map((d) => (
                        <div
                          key={d.id}
                          className="card w-100 border shadow m-2"
                        >
                          <div className="">
                            <figure className="mt-4">
                              {d.image ? (
                                <Link href={"/recipes/" + d.id}>
                                  <Image
                                    className="rounded-xl cursor-pointer"
                                    loader={() => d.image}
                                    // layout="fill"
                                    objectFit="cover"
                                    src={d.image}
                                    unoptimized={true}
                                    width={200}
                                    height={200}
                                    // layout="fill"
                                    position="relative"
                                    // objectFit="contain"
                                  />
                                </Link>
                              ) : null}
                            </figure>
                            <div className="card-actions justify-center self-center pt-4">
                              <div className="badge badge-outline border-stone-400 w-2/5">
                                {d.total_cook_time} mins
                              </div>
                              <div className="badge badge-outline border-stone-400 w-2/5">
                                {d.num_likes} saves
                              </div>
                            </div>
                            <div className="card-body px-4 pt-2 pb-4">
                              <Link href={"/recipes/" + d.id}>
                                <a className="text-xl font-semibold">
                                  {d.title}
                                </a>
                              </Link>
                              {d.avg_rating ? (
                                <div>
                                  {d.avg_rating.toFixed(2)}{" "}
                                  {d.avg_rating
                                    ? getStars(d.avg_rating)
                                    : "No rating"}{" "}
                                  - ({d.reviews.length})
                                </div>
                              ) : (
                                <div>No Rating</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </>
              </div>
              <div className=" flex  justify-center my-2 ">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={(isFetchingNextPage, !hasNextPage)}
                  className="p-2 rounded text-lg bg-stone-100 border"
                >
                  {isFetchingNextPage
                    ? // <button class="btn btn-square loading"></button>
                      null
                    : hasNextPage
                    ? "Load More"
                    : "No more results"}
                </button>
              </div>
              <div>
                {isFetching && !isFetchingNextPage ? "Fetching..." : null}
              </div>
            </div>
            <div className="bg-stone-100 rounded-lg p-2 my-4" ref={myRef}>
              <p className="text-2xl my-2 ml-2 font-medium">Most Popular</p>
            </div>

            <div className="bg-stone-100 rounded-lg p-2 my-4">
              <p className="text-2xl my-2 ml-2 font-medium">
                Expert Recommended
              </p>
            </div>
          </div>
          <div className="flex justify-center w-1/5">
            {/* <p>test</p> */}
            <div className=" shadow rounded-lg p-2 ml-4 w-full h-64">
              <div className="flex flex-row items-center">
                <div className="flex flex-row items-center m-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <p className="text-2xl my-2 ml-2 font-medium">Trending </p>
                </div>
              </div>
              <ul className="menu w-56 rounded-box">
                <li>
                  <a>Chicken Pot Pie</a>
                </li>
                <li>
                  <a>Pork Dumplings</a>
                </li>
                <li>
                  <a>Tower of Waffles</a>
                </li>
                <li>
                  <a>Chocolate Shortbread</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
