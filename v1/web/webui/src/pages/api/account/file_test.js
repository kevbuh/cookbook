import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    // const { image1, user1, recipe1 } = req.body;
    const body = req.body;
    // console.log("FILE_TEST REQ BODY", req.body);

    if (access === false) {
      return res.status(401).json({
        error: "User unauthorized to make this request, false access token",
      });
    }

    return res.status(200).json({
      success: "getting access!!!!!",
      token: access,
    });

    //   try {
    //     const apiRes = await fetch(`${API_URL}/upload/`, {
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "multipart/form-data",
    //         Authorization: "Bearer " + access,
    //       },
    //       body: body,
    //     });
    //     const data = await apiRes.json();
    //     console.log("SENT POST REQUEST");

    //     if (apiRes.status === 200) {
    //       return res.status(200).json({
    //         success: "ADDED FILE!!!!!",
    //         data: data,
    //       });
    //     } else {
    //       return res.status(apiRes.status).json({
    //         success: "FAILED ADD FILE",
    //       });
    //     }
    //   } catch (err) {
    //     return res.status(500).json({
    //       error: "Something went wrong when retrieving user",
    //     });
    //   }
    // } else {
    //   res.setHeader("Allow", ["GET"]);
    //   return res.status(405).json({
    //     error: `Method ${req.method} not allowed *****`,
    //   });
  }
};
