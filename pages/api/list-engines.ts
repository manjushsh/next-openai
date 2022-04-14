import { NextApiRequest, NextApiResponse } from "next";
import ListEngines from "../../operations/list-engines-v1";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { OPEN_AI_ORG, OPENAI_API_KEY } = req.body;
    if (OPEN_AI_ORG && OPENAI_API_KEY) {
        try {
            const response: any = await ListEngines({ OPEN_AI_ORG, OPENAI_API_KEY });
            if (response?.data)
                return res.status(200).json({ data: response?.data });
        }
        catch (error) { console.debug("Caught Error. Error details: ", error) };
    }
    // res.end(`Hello ${name}! ${queastion}?`);
}

export default handler;
