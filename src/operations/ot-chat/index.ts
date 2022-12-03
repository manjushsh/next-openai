import OpenAIConfig from "../common/config-ai";
import { DEFAULT_ENGINE } from "../common/constants";

const defaultParameters = {
  temperature: 0,
  max_tokens: 60,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
};

const oneTimeChat = async ({
  configuration,
  statement = "",
  model = DEFAULT_ENGINE,
}: AI_CONFIG_TYPE) => {
  const OpenAI = OpenAIConfig.configure({
    apiKey: configuration.OPENAI_API_KEY,
    organization: configuration.OPEN_AI_ORG,
  });
  try {
    const response = await OpenAI.createCompletion({
      model,
      prompt: statement,
      ...defaultParameters,
    });
    return response?.data;
  } catch (error) {
    console.warn("Error details: ", error);
  }
};
export default oneTimeChat;

interface AI_CONFIG_TYPE {
  configuration: {
    OPEN_AI_ORG?: string;
    OPENAI_API_KEY: string;
  };
  statement?: string;
  model?: string;
}
