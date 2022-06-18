import Head from "next/head";

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>CookBook Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="text-3xl font-medium p-6">
        <p>CookBook</p>
      </div>
      <div>
        {data.map((d) => (
          <div key={d.id} className="p-6">
            <p>Title: {d.title}</p>
            <p>CookTime: {d.total_cook_time}</p>
            <p>Description: {d.description}</p>
            <br></br>
          </div>
        ))}
      </div>
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
