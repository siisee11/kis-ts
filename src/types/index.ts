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
  /**
   * 인증타입
   * "client_credentials" 값 고정
   */
  grantType?: string;
};

export type KisAuthToken = {
  /** 접근토큰 */
  accessToken: string;
  /** 접근토큰유형 ("Bearer") */
  tokenType: string;
  /** 접근토큰유효기간(초) */
  expiresIn: number;
  scope?: string;
  issuedAt?: number;
};

export type KisAuthTokenResponse = {
  token: KisAuthToken;
};


