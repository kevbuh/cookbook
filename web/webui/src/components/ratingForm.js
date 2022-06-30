import { Formik, Field, Form } from "formik";

export const ratingForm = () => {
  const [showRate, setShowRate] = useState(false);

  const userID = useSelector((state) => state.auth.user?.id);

  return (
    <Formik
      initialValues={{
        user: userID,
        rate: "",
        recipe: sentData.id,
      }}
      onSubmit={(values) => {
        fetch(`/api/account/post_rating`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then(() => router.reload(window.location.pathname))
          .catch((error) => console.log("error", error));
      }}
    >
      <Form className="py-3 pl-3 flex flex-col  w-1/2 rounded bg-stone-200  mt-6">
        <label htmlFor="rate" className=" rounded text-xl">
          Rate this recipe below:
        </label>
        <Field
          id="rate"
          name="rate"
          placeholder="Give a rating 1-5 stars"
          className="bg-stone-100 rounded p-2 my-2 w-2/4 "
        />

        <div className="flex flex-row items-end ">
          <button
            className="bg-stone-200 p-2 mr-3 my-2 rounded font-semibold w-1/6"
            onClick={() => setShowRate((showRate) => !showRate)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-pink-600 p-2 my-2 rounded text-white font-semibold w-1/6"
          >
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};
