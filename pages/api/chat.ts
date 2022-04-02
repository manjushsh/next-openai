import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.query;
    const { queastion } = req.body;
    res.end(`Hello ${name}! ${queastion}?`);
}

export default handler;
