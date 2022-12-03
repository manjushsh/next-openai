import OpenAIConfig from "../common/config-ai";

const ListEngines = async ({ OPEN_AI_ORG, OPENAI_API_KEY }: ConfigObject) => {
  const OpenAI = OpenAIConfig.configure({
    apiKey: OPENAI_API_KEY,
    organization: OPEN_AI_ORG,
  });
  try {
    const response = await OpenAI.listEngines();
    return response?.data;
  } catch (error) {
    console.warn("Error details: ", error);
    return { error: "Something went wrong" };
  }
};
export default ListEngines;

interface ConfigObject {
  OPEN_AI_ORG: string;
  OPENAI_API_KEY: string;
}
