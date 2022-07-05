import Layout from "../hocs/Layout";
import { useSession, signIn, signOut } from "next-auth/react";

function specialFeaturesPage() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col items-center my-10">
            <p className="text-3xl my-6">Next-Auth Test</p>
          </div>
          <div>
            {session ? (
              <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
              </>
            ) : (
              <>
                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default specialFeaturesPage;
