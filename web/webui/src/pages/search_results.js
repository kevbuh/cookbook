import Layout from "../hocs/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../config/index";
import Link from "next/link";
import Image from "next/image";

function search_results({ data }) {
  const { query } = useRouter();
  // console.log("::::", data);
  const getStars = (num_stars) => {
    const steps = [];
    for (let i = 1; i <= num_stars; i++) {
      steps.push("⭐️");
    }
    return steps;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res2 = await fetch(`${API_URL}/search/?search=${query.result}`, {
        method: "GET",
      });

      const gotBack = await res2.json();
      console.log(gotBack);

      if (res2.status === 200) {
        console.log("GOT SEARCH RESULTS");
      }
    } catch (err) {
      console.log("failed at search_results.js catch");
    }
  };

  return (
    <Layout>
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col items-center my-10">
            {data.length == 0 ? (
              <p className="text-3xl mt-6 mb-96">No Search Results!</p>
            ) : (
              <p className="text-3xl mt-6">Search Results</p>
            )}
          </div>
          <div className="grid grid-cols-4 ">
            {data.map((d) => (
              <div key={d.id} className="card w-100 border shadow m-2">
                <div className="">
                  <figure className="">
                    {d?.image ? (
                      <Link href={"/recipes/" + d.id}>
                        <Image
                          className="rounded-xl cursor-pointer"
                          loader={() => d.image}
                          objectFit="cover"
                          src={d.image}
                          unoptimized={true}
                          width={200}
                          height={200}
                          position="relative"
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
                      <a className="text-xl font-semibold">{d.title}</a>
                    </Link>
                    {d.avg_rating ? (
                      <div>
                        {d.avg_rating ? getStars(d.avg_rating) : "No rating"}{" "}
                      </div>
                    ) : (
                      <div>No Rating</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const searchQuery = context.query.result; // Get ID from slug `/book/1`
  console.log("result:::", searchQuery);
  // If routing to `/book/1?name=some-book`
  // Outputs: `{ id: '1', name: 'some-book' }`

  // // Fetch data from external API
  const res = await fetch(`${API_URL}/search/?search=${searchQuery}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await res.json();

  // // Pass data to the page via props
  return { props: { data } };
}

export default search_results;
