import axios, { type AxiosInstance } from "axios";
import { requestWebsocketApprovalKey } from "../api/oauth2/Approval";
import { requestAccessToken } from "../api/oauth2/tokenP";
import type { KisDomesticContext } from "../api/domestic-stock";
import type { KisOverseasContext } from "../api/overseas-stock";
import { ensureCredentials, ensureEnvironment, resolveBaseUrl } from "../auth";
import { KisError } from "../errors";
import type {
  KisAuthRequest,
  KisAuthToken,
  KisClientOptions,
  KisCredentials,
  KisEnvironment,
  KisWebsocketToken,
  KisWebsocketTokenRequest,
} from "../types";
import { KisDomesticClient } from "./domestic";
import { KisOverseasClient } from "./overseas";

export class KisClient {
  private appKey?: string;
  private appSecret?: string;
  private env: KisEnvironment;
  private realHttp: AxiosInstance;
  private demoHttp: AxiosInstance;
  private accessToken?: string;

  public domestic: KisDomesticClient;
  public overseas: KisOverseasClient;

  constructor(options: KisClientOptions = {}) {
    this.appKey = options.appKey ?? process.env.KIS_APP_KEY;
    this.appSecret = options.appSecret ?? process.env.KIS_APP_SECRET;
    this.env = ensureEnvironment(options.env);
    this.realHttp = axios.create({
      baseURL: resolveBaseUrl("real", options),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    this.demoHttp = axios.create({
      baseURL: resolveBaseUrl("demo", options),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    this.domestic = new KisDomesticClient(this);
    this.overseas = new KisOverseasClient(this);
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessTokenValue(): string | undefined {
    return this.accessToken;
  }

  setCredentials(credentials: KisCredentials) {
    this.appKey = credentials.appKey;
    this.appSecret = credentials.appSecret;
  }

  setEnvironment(env: KisEnvironment) {
    this.env = ensureEnvironment(env);
  }

  private requireCredentials(): KisCredentials {
    return ensureCredentials(
      this.appKey ?? process.env.KIS_APP_KEY,
      this.appSecret ?? process.env.KIS_APP_SECRET,
    );
  }

  private getHttp(): AxiosInstance {
    return this.env === "real" ? this.realHttp : this.demoHttp;
  }

  getOverseasContext(
    accessToken: string,
    options: { custType?: "P" | "B"; hashKey?: string } = {},
  ): KisOverseasContext {
    if (!accessToken?.trim()) {
      throw new KisError("accessToken is required to call overseas APIs.");
    }

    return {
      http: this.getHttp(),
      credentials: this.requireCredentials(),
      accessToken: accessToken.trim(),
      custType: options.custType,
      hashKey: options.hashKey,
    };
  }

  getDomesticContext(
    accessToken: string,
    options: { custType?: "P" | "B"; hashKey?: string } = {},
  ): KisDomesticContext {
    if (!accessToken?.trim()) {
      throw new KisError("accessToken is required to call domestic APIs.");
    }

    return {
      http: this.getHttp(),
      credentials: this.requireCredentials(),
      accessToken: accessToken.trim(),
      custType: options.custType,
      hashKey: options.hashKey,
    };
  }

  async getAccessToken(request: KisAuthRequest = {}): Promise<KisAuthToken> {
    return requestAccessToken(
      this.getHttp(),
      this.requireCredentials(),
      request,
    );
  }

  async getWebsocketApprovalKey(
    request: KisWebsocketTokenRequest = {},
  ): Promise<KisWebsocketToken> {
    return requestWebsocketApprovalKey(
      this.getHttp(),
      this.requireCredentials(),
      request,
    );
  }
}

export const createKisClient = (options: KisClientOptions = {}) =>
  new KisClient(options);
