import { NextApiRequest, NextApiResponse } from "next";
import oneTimeChat from "../../operations/ot-chat";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { configuration, statement, model }: AI_CONFIG_TYPE = req.body;

  if (configuration.OPENAI_API_KEY) {
    // configuration.OPEN_AI_ORG
    try {
      await oneTimeChat({ configuration, statement, model })
        .then((response) => {
          if (response?.choices && response.choices.length > 0)
            return res.status(200).json({ data: response });
          else return res.status(401).json({ error: response });
        })
        .catch((err) =>
          res.status(401).json({
            error: `API fetch failed. Error: ${err?.status} ${err?.message}`,
          })
        );
    } catch (error: any) {
      return res.status(401).json({
        error: `API fetch failed. Error: ${error?.status} ${error?.message}`,
      });
    }
  }
};

export default handler;

interface AI_CONFIG_TYPE {
  configuration: {
    OPEN_AI_ORG?: string;
    OPENAI_API_KEY: string;
  };
  statement?: string;
  model?: string;
}
