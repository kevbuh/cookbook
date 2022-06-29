import Layout from "../hocs/Layout";
import { API_URL } from "../config/index";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";

function premiumResultPage() {
  const router = useRouter();
  const { success, canceled } = router.query;
  const userID = useSelector((state) => state.auth?.user?.id);
  const user = useSelector((state) => state.auth?.user);
  const loading = useSelector((state) => state.auth.loading);

  const updateUserPremiumStatus = async () => {
    console.log("TRYING BEFORE STRIPE UPDATE");

    try {
      const res = await fetch(`/api/account/file_test`, {
        // gets the user token
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      const token = await res.json();

      const res2 = await fetch(`${API_URL}/auth/update_profile/${userID}/`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: user.first_name,
          email: user.email,
          is_premium: true,
        }),
      });

      console.log("server status after stripe", res2.status);

      if (res2.status === 200) {
        console.log("STRIPE WORKED");
      }
    } catch (err) {
      console.log("failed at premium_result.js catch");
    }
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    // const query = new URLSearchParams(window.location.search);

    if (success !== undefined || canceled !== undefined) {
      if (success && !loading && user) {
        updateUserPremiumStatus();
        console.log("Order placed! You will receive an email confirmation.");
      }

      if (canceled) {
        console.log(
          "Order canceled -- continue to shop around and checkout when you’re ready."
        );
      }
    }
  }, [canceled, user]);

  return (
    <Layout>
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col items-center my-10">
            {success ? (
              <p className="text-3xl my-6">Thank You</p>
            ) : (
              <p className="text-3xl my-6">Keep Looking</p>
            )}
            {success ? (
              <p>Thanks for joining CookBook+!</p>
            ) : (
              <p>We hope you consider CookBook+ in the future!</p>
            )}
            {success ? (
              <p>You have now unlocked all features. Lets get eating!</p>
            ) : (
              <p>Not satisfied? Contact us with your experience. </p>
            )}
          </div>
          <div className="h-80 flex align-center items-center justify-center">
            <Link href="/profile">
              <button className="bg-pink-600 text-white text-lg px-4 py-2 rounded-lg ">
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default premiumResultPage;
