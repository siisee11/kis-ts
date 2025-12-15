import axios, { type AxiosInstance } from "axios";
import {
  requestWebsocketApprovalKey,
  type RequestWebsocketApprovalKeyRequest,
  type RequestWebsocketApprovalKeyResponse,
} from "../api/oauth2/Approval";
import { requestAccessToken } from "../api/oauth2/tokenP";
import type { KisDomesticContext } from "../api/domestic";
import type { KisOverseasContext } from "../api/overseas";
import { ensureCredentials, ensureEnvironment, resolveBaseUrl } from "../auth";
import { KisError } from "../errors";
import type {
  KisAuthRequest,
  KisAuthToken,
  KisClientOptions,
  KisCredentials,
  KisEnvironment,
} from "../types";
import { KisDomesticClient } from "./domestic";
import { KisOverseasClient } from "./overseas";

/**
 * KIS (Korea Investment & Securities) Client
 *
 * This client provides a convenient interface to interact with KIS APIs.
 * It handles authentication, token management, and provides access to domestic and overseas stock APIs.
 */
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

  /**
   * Ensures a valid access token exists.
   * If a token is already set, it returns it.
   * Otherwise, it requests a new access token using the configured credentials.
   *
   * @returns {Promise<string>} The access token.
   */
  async ensureAccessToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }

    const { accessToken } = await this.getAccessToken();
    this.accessToken = accessToken;
    return accessToken;
  }

  /**
   * Manually sets the access token.
   * Useful if you want to manage the token externally.
   *
   * @param {string} token - The access token to set.
   */
  setAccessToken(token: string) {
    this.accessToken = token;
  }

  /**
   * Gets the current access token value.
   *
   * @returns {string | undefined} The current access token, or undefined if not set.
   */
  getAccessTokenValue(): string | undefined {
    return this.accessToken;
  }

  /**
   * Updates the client credentials.
   *
   * @param {KisCredentials} credentials - The new credentials (appKey, appSecret).
   */
  setCredentials(credentials: KisCredentials) {
    this.appKey = credentials.appKey;
    this.appSecret = credentials.appSecret;
  }

  /**
   * Updates the environment (real or demo).
   *
   * @param {KisEnvironment} env - The new environment.
   */
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

  /**
   * Gets the context required for calling overseas stock APIs.
   *
   * @param {string} accessToken - The access token to use.
   * @returns {KisOverseasContext} The context object for overseas API calls.
   */
  getContext(
    accessToken: string,
  ): KisOverseasContext {
    if (!accessToken?.trim()) {
      throw new KisError("accessToken is required to call overseas APIs.");
    }

    return {
      http: this.getHttp(),
      credentials: this.requireCredentials(),
      accessToken: accessToken.trim(),
    };
  }

  /**
   * Requests a new access token from the KIS API.
   *
   * @param {KisAuthRequest} request - Optional request parameters.
   * @returns {Promise<KisAuthToken>} The response containing the access token.
   */
  async getAccessToken(request: KisAuthRequest = {}): Promise<KisAuthToken> {
    return requestAccessToken(
      this.getHttp(),
      this.requireCredentials(),
      request,
    );
  }

  /**
   * Requests a websocket approval key.
   *
   * @param {RequestWebsocketApprovalKeyRequest} request - Optional request parameters.
   * @returns {Promise<RequestWebsocketApprovalKeyResponse>} The approval key response.
   */
  async getWebsocketApprovalKey(
    request: RequestWebsocketApprovalKeyRequest = {},
  ): Promise<RequestWebsocketApprovalKeyResponse> {
    return requestWebsocketApprovalKey(
      this.getHttp(),
      this.requireCredentials(),
      request,
    );
  }
}

export const createKisClient = (options: KisClientOptions = {}) =>
  new KisClient(options);
