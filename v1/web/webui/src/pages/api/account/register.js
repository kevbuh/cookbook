import { API_URL } from "../../../config";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password, password2 } = req.body;
    const body = JSON.stringify({ email, password, password2 });
    // console.log("NEXT API HERRE", body);
    try {
      const apiRes = await fetch(`${API_URL}/auth/register/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await apiRes.json();
      // console.log("GOT STATUS", apiRes.status);

      if (apiRes.status === 201) {
        return res.status(201).json({ success: data.success });
      } else {
        return res.status(apiRes.status).json({ error: data.error });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong when registering an account" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
