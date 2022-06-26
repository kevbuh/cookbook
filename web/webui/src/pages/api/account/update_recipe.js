import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "PUT") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    // console.log("ACCESS", access);
    // console.log("req body in update_recipe.js:", req.body.recipeID);
    // const {
    //   author,
    //   title,
    //   description,
    //   image,
    //   cook_time,
    //   price,
    //   source,
    //   recipeID,
    // } = req.body;

    // const body = JSON.stringify({
    //   author,
    //   title,
    //   description,
    //   image,
    //   cook_time,
    //   price,
    //   source,
    //   recipeID,
    // });
    // console.log("body:", body);

    if (access === false) {
      return res.status(401).json({
        error: "User unauthorized to make this request, false access token",
      });
    }

    try {
      const apiRes = await fetch(`${API_URL}/recipe/${recipeID}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access,
        },
        body: req.body,
      });
      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(200).json({
          success: "UPDATED RECIPE!!!!!",
          data: data,
        });
      } else {
        return res.status(apiRes.status).json({
          success: "FAILED UPDATE RECIPE",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when retrieving user",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed *****`,
    });
  }
};
