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

export type KisWebsocketTokenRequest = {
  grantType?: string;
  token?: string;
};

export type KisWebsocketToken = {
  approvalKey: string;
  accessToken?: string;
  expiresIn?: number;
};

export type KisWebsocketTokenResponse = {
  websocket: KisWebsocketToken;
};
