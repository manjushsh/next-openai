import { NextApiRequest, NextApiResponse } from "next";
import oneTimeChat from "./ot-chat";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { configuration, statement } = req.body;
    if (configuration.OPEN_AI_ORG && configuration.OPENAI_API_KEY) {
        try {
            const response: any = await oneTimeChat({ configuration, statement });
            if (response?.data)
                return res.status(200).json({ data: response?.data });
            else
                return res.status(401).json({ error: response?.error });
        }
        catch (error) { console.debug("Caught Error. Error details: ", error) };
    }
    // res.end(`Hello ${name}! ${queastion}?`);
}

export default handler;
