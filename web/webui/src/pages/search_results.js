import Layout from "../hocs/Layout";
import { useRouter } from "next/router";
import { API_URL } from "../config/index";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "react-query";

function search_results() {
  const { query } = useRouter();
  const getStars = (num_stars) => {
    const steps = [];
    for (let i = 1; i <= num_stars; i++) {
      steps.push("⭐️");
    }
    return steps;
  };

  const fetchSearchResults = async (url) => {
    const res = await fetch(`${API_URL}/search/?search=${url}`);
    return res.json();
  };

  const {
    isLoading,
    isError,
    data: rqdata,
    error,
  } = useQuery(["searchResults", query.result], () =>
    fetchSearchResults(query.result)
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Layout>
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col items-center my-10">
            {rqdata.length == 0 ? (
              <p className="text-3xl mt-6 mb-96">No Search Results!</p>
            ) : (
              <p className="text-3xl mt-6">Search Results</p>
            )}
          </div>
          <div className="grid grid-cols-4 ">
            {rqdata.map((d) => (
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

export default search_results;
