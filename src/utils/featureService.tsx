const FeatureService = (props: FeatureServiceProps) => {
  const { token, isEnabled, children } = props;
  return isEnabled || TOKENS.includes(token) ? <>{children}</> : <></>;
};

export default FeatureService;

export const featureValidations = {
  isTokenEnabled: (token: TOKEN) => TOKENS.includes(token),
};
export type TOKEN = string;

export interface FeatureServiceProps {
  token: TOKEN;
  isEnabled?: boolean;
  children?: any;
}

export const TOKENS = [
  "OPENAI.LOGIN",
  "OPENAI.CHAT",
];
