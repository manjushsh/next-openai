import OpenAIConfig from "../common/config-ai";

const ListEngines = async ({
  OPEN_AI_ORG,
  OPENAI_API_KEY,
  prompt = "a white siamese cat",
  size = "1024x1024",
}: ConfigObject) => {
  const OpenAI = OpenAIConfig.configure({
    apiKey: OPENAI_API_KEY,
    organization: OPEN_AI_ORG,
  });
  try {
    const response = await OpenAI.createImage({
      prompt,
      n: 1,
      size,
    });
    const imageUrl = response?.data?.data?.length
      ? response?.data?.data[0].url
      : "";
    return imageUrl;
  } catch (error) {
    console.warn("Error details: ", error);
    return { error: "Something went wrong" };
  }
};
export default ListEngines;

interface ConfigObject {
  OPEN_AI_ORG: string;
  OPENAI_API_KEY: string;
  [key: string]: any;
}
