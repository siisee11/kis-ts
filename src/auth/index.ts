import {
  DEFAULT_DEMO_BASE_URL,
  DEFAULT_PROD_BASE_URL,
} from "../config/constants";
import { KisError } from "../errors";
import type {
  KisClientOptions,
  KisCredentials,
  KisEnvironment,
} from "../types";

export const ensureCredentials = (
  appKey?: string,
  appSecret?: string,
): KisCredentials => {
  if (!appKey || !appSecret) {
    throw new KisError("KIS credentials are not configured.");
  }
  return { appKey, appSecret };
};

export const ensureEnvironment = (env?: KisEnvironment): KisEnvironment =>
  env === "demo" || env === "real" ? env : "real";

export const resolveBaseUrl = (
  env: KisEnvironment,
  options?: Pick<KisClientOptions, "baseURL" | "demoBaseURL">,
) => {
  if (env === "demo") {
    return options?.demoBaseURL ?? DEFAULT_DEMO_BASE_URL;
  }
  return options?.baseURL ?? DEFAULT_PROD_BASE_URL;
};
