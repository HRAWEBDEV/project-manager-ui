export type SignUpStep = (typeof signUpSteps)[number];

export const signUpSteps = [
  "userInfo",
  "organizationInfo",
  "accountInfo",
] as const;
