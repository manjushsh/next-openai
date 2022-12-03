import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;
  const { graphJSONKey, collection } = process.env;
  if (data) {
    const payload = {
      api_key: graphJSONKey,
      collection: collection,
      json: JSON.stringify(data),
      timestamp: Math.floor(new Date().getTime() / 1000),
    };
    try {
      const response = await fetch("https://api.graphjson.com/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return res.status(200).json({ data: response });
    } catch (error: any) {
      return res.status(401).json({
        error: `API fetch failed. Error: ${error?.status} ${error?.message}`,
      });
    }
  }
};

export default handler;
