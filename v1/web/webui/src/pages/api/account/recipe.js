import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    // console.log("ACCESS", access);
    // console.log("req body:", req.body);
    const { author, title, description, total_cook_time, price, source } =
      req.body;

    const body = JSON.stringify({
      author,
      title,
      description,
      // total_cook_time,
      // price,
      // source,
    });
    // console.log("body:", body);

    if (access === false) {
      return res.status(401).json({
        error: "User unauthorized to make this request, false access token",
      });
    }

    try {
      const apiRes = await fetch(`${API_URL}/recipe/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access,
        },
        body: body,
      });
      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(200).json({
          success: "ADDED RECIPE!!!!!",
          data: data,
        });
      } else {
        return res.status(apiRes.status).json({
          success: "FAILED ADD RECIPE",
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
