import { Configuration, OpenAIApi } from "openai";
// require('dotenv').config();

const OpenAIConfigService = {
  configure: ({
    apiKey = process.env.OPENAI_API_KEY,
    organization = process.env.OPEN_AI_ORG,
  }) => {
    const configuration = new Configuration({
      organization,
      apiKey,
    });
    return new OpenAIApi(configuration);
  },
};

export default OpenAIConfigService;
