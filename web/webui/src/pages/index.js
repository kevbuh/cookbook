import { useState } from "react";
import Link from "next/link";
import Layout from "../hocs/Layout";
import { API_URL } from "../config";
import Image from "next/image";

export default function Home({ data }) {
  const [sentData, setSentData] = useState(data);

  const getStars = (num_stars) => {
    const steps = [];
    for (let i = 1; i <= num_stars; i++) {
      steps.push("⭐️");
    }
    return steps;
  };

  return (
    <Layout title="CookBook | Home" content="CookBook Home">
      <div className=" flex flex-col justify-self-center   my-5 self-center items-center">
        <div className="w-2/3">
          <div className="bg-stone-100 rounded-lg p-2">
            <p className="text-2xl my-2 ml-2 font-medium">Recipes For You</p>
            <div className="grid grid-cols-4 ">
              {sentData.map((d) => (
                <div key={d.id} className="m-2 bg-zinc-200 rounded-lg p-3">
                  {d.header_image ? (
                    <Link href={"/recipes/" + d.id}>
                      <Image
                        className="rounded-3xl cursor-pointer"
                        loader={() => d.header_image}
                        src={d.header_image}
                        unoptimized={true}
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                      />
                    </Link>
                  ) : null}
                  <Link href={"/recipes/" + d.id}>
                    <a className="text-lg font-semibold ">{d.title}</a>
                  </Link>
                  {d.avg_rating ? (
                    <div>
                      {d.avg_rating.toFixed(2)}{" "}
                      {d.avg_rating ? getStars(d.avg_rating) : "N/A"} - (
                      {d.reviews.length})
                    </div>
                  ) : (
                    <div>N/A</div>
                  )}
                  <p>Time: {d.total_cook_time} mins</p>
                  <p>Description: {d.description}</p>
                  <p>Favorited {d.num_likes} times</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${API_URL}/recipe/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
