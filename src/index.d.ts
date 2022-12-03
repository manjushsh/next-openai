export interface DynamicObject {
  [key: string]: any;
}

export interface DefaultProviderType {
  OPENAI_CREDENTIALS?: {
    OPENAI_API_KEY: null;
    OPEN_AI_ORG: null;
  };
  [key: string]: any;
}
