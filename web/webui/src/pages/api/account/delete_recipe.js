import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    // console.log("CALLED DELETE API PAGE******");

    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    // console.log("ACCESS", access);
    // console.log("req body:", req.body);

    const body = JSON.stringify(req.body);
    // console.log("body:", body);

    if (access === false) {
      return res.status(401).json({
        error: "User unauthorized to make this request, false access token",
      });
    }

    try {
      const apiRes = await fetch(`${API_URL}/recipe/${body}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access,
        },
      });

      if (apiRes.status === 204) {
        return res.status(204).end();
      } else {
        return res.status(apiRes.status).json({
          success: "FAILED DELETED RECIPE",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when DELETED recipe",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed *****`,
    });
  }
};
