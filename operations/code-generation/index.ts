import OpenAIConfig from '../common/config-ai';
import { DEFAULT_ENGINE } from '../common/constants';

const JSBot = async ({ configuration, statement = '', model = DEFAULT_ENGINE, MAX_TOCKENS = 60 }: AI_CONFIG_TYPE) => {

    const defaultParameters = {
        prompt: `You: ${statement}\nJavaScript chatbot:`,
        temperature: 0,
        max_tokens: MAX_TOCKENS,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["You:"],
    };

    const OpenAI = OpenAIConfig.configure({ apiKey: configuration.OPENAI_API_KEY, organization: configuration.OPEN_AI_ORG });
    try {
        const response = await OpenAI.createCompletion(model, defaultParameters);
        return response?.data;
    }
    catch (error) {
        console.warn("Error details: ", error);
    }
}
export default JSBot;

interface AI_CONFIG_TYPE {
    configuration: {
        OPEN_AI_ORG?: string;
        OPENAI_API_KEY: string;
    }
    statement?: string;
    model?: string;
    MAX_TOCKENS?: number;
}