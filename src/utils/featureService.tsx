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
  "CANDIDATE_PORTAL.DASHBOARD",
  "CANDIDATE_PORTAL.DASHBOARD.PROFILE",
  "CANDIDATE_PORTAL.DASHBOARD.PROFILE.UPDATE",
  "CANDIDATE_PORTAL.DASHBOARD.VIDEO_RESUME",
  "CANDIDATE_PORTAL.DASHBOARD.VIDEO_RESUME.UPDATE",
  "CANDIDATE_PORTAL.DASHBOARD.VIDEO_RESUME.VIDEO",
  "CANDIDATE_PORTAL.DASHBOARD.VIDEO_RESUME.ACTIONS",
  "CANDIDATE_PORTAL.DASHBOARD.SUGGESTED_JOBS",
  "CANDIDATE_PORTAL.DASHBOARD.SUGGESTED_JOBS.ACTIONS",
];
