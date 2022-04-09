import OpenAIConfig from '../common/config-ai';
import { ConfigObject } from './index-d';

const ListEngines = async ({ OPEN_AI_ORG, OPENAI_API_KEY }: ConfigObject) => {
    const OpenAI = OpenAIConfig.configure({ organization: OPEN_AI_ORG, apiKey: OPENAI_API_KEY });
    try {
        const response = await OpenAI.listEngines();
        return response?.data;
    }
    catch (error) {
        console.warn("Error details: ", error);
        return { error: 'Something went wrong' };
    }
}
export default ListEngines;