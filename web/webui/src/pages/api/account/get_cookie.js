import { API_URL } from "../../../config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (access === false) {
      return res.status(403).json({
        error: "User forbidden from making the request",
      });
    } else {
      const body = JSON.stringify({
        token: access,
      });
      return res
        .status(200)
        .json({
          success: "Authenticated successfully, got cookie from dispatch",
          body: body,
        });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
