import { NextApiRequest, NextApiResponse } from "next";
import ListEngines from "../../operations/list-engines-v1";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { OPEN_AI_ORG, OPENAI_API_KEY } = req.body;
  if (OPENAI_API_KEY) {
    // OPEN_AI_ORG
    try {
      const response: any = await ListEngines({ OPENAI_API_KEY, OPEN_AI_ORG });
      if (response?.data) return res.status(200).json({ data: response?.data });
      else return res.status(401).json({ error: response?.data });
    } catch (error: any) {
      return res.status(401).json({
        error: `API fetch failed. Error: ${error?.status} ${error?.message}`,
      });
    }
  }
  // res.end(`Hello ${name}! ${queastion}?`);
};

export default handler;
