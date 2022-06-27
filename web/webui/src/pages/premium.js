import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Layout from "../hocs/Layout";
import { API_URL } from "../config/index";
import { useRouter } from "next/router";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PremiumPage = () => {
  const router = useRouter();
  const { success, canceled } = router.query;

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    // const query = new URLSearchParams(window.location.search);

    if (success !== undefined || canceled !== undefined) {
      if (success) {
        console.log("Order placed! You will receive an email confirmation.");
      }

      if (canceled) {
        console.log(
          "Order canceled -- continue to shop around and checkout when you’re ready."
        );
      }
    }
  }, [success, canceled]);

  return (
    <Layout>
      <div className=" flex flex-col justify-self-center  mx-6 my-5 self-center items-center">
        <div className="w-2/3 flex flex-col">
          <div className="flex flex-col items-center my-10">
            <p className="text-3xl mt-6">CookBook+</p>
            <p>Everything Food, personalized for you</p>
            <br />
            <div className="my-6">
              <p>Don't know what to cook?</p>
              <p>Its all here. Get eating with CookBook+</p>
              <p>
                Save time preparing, more enjoying your meal with loved ones
              </p>
              <p>Find your future favorite food</p>
              <p>Plan less, eat better</p>
              <p>The ultimate eating experience</p>
              <p>The food platform for everyone</p>
              <p>Supported by a loving community, not by annoying popup ads</p>
            </div>
            <div className="my-6">
              Not know what to eat? Sick of cooking the same thing? Want to eat
              something new? Low on time? Adventurous? Get person
              recommendations with our food recommendation engine, with recipes,
              equipment, restaurants
            </div>
            <div className="my-6">
              Don't know how to cook? Want to make your own recipes more
              flavorful? Learn how with CookBook+ Classes.
            </div>
          </div>
        </div>
        <form action="/api/checkout_sessions" method="POST">
          <section>
            <button
              type="submit"
              role="link"
              className="bg-pink-600 text-white text-lg px-4 py-2 rounded-lg "
            >
              Get CookBook+
            </button>
          </section>
        </form>
      </div>
      //{" "}
    </Layout>
  );
};

export default PremiumPage;
