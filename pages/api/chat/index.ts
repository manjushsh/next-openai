import OpenAIConfig from '../common/config-ai';

const oneTimeChat = async ({ statement = '', model = 'text-davinci-002' }) => {
    const OpenAI = OpenAIConfig.configure({});
    try {
        const response = await OpenAI.createCompletion(model, {
            prompt: statement,
            temperature: 0,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        return response?.data;
    }
    catch (error) {
        console.warn("Error details: ", error);
    }
}
export default oneTimeChat;