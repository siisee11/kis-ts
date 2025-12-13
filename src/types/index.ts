export type KisEnvironment = "real" | "demo";

export type KisClientOptions = {
  env?: KisEnvironment;
  appKey?: string;
  appSecret?: string;
  baseURL?: string;
  demoBaseURL?: string;
};

export type KisCredentials = Required<
  Pick<KisClientOptions, "appKey" | "appSecret">
>;

export type KisAuthRequest = {
  grantType?: string;
};

export type KisAuthToken = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  scope?: string;
  issuedAt?: number;
};

export type KisAuthTokenResponse = {
  token: KisAuthToken;
};


