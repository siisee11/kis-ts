import type { AxiosInstance, AxiosResponse } from "axios";
import { KisError, toKisError } from "../../errors";
import type { KisCredentials, KisEnvironment } from "../../types";

export type KisOverseasContext = {
  http: AxiosInstance;
  credentials: KisCredentials;
  accessToken: string;
  custType?: "P" | "B";
  hashKey?: string;
};

export type KisPageCursor = {
  trCont?: string;
  fk?: string;
  nk?: string;
};

export type OverseasRequestOptions = {
  path: string;
  trId: string;
  trCont?: string;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
  hashKey?: string;
  errorMessage?: string;
};

export type PaginationKeys = {
  fk?: string;
  nk?: string;
};

export type PaginationConfig = {
  cursorKeys?: PaginationKeys;
  cursor?: KisPageCursor;
  maxPages?: number;
  autoPaginate?: boolean;
};

export const defaultMaxPages = 10;

export const buildHeaders = (
  ctx: KisOverseasContext,
  trId: string,
  trCont?: string,
  hashKey?: string,
) => {
  if (!ctx.accessToken) {
    throw new KisError("accessToken is required to call overseas APIs.");
  }

  return {
    Authorization: `Bearer ${ctx.accessToken}`,
    appkey: ctx.credentials.appKey,
    appsecret: ctx.credentials.appSecret,
    tr_id: trId,
    custtype: ctx.custType ?? "P",
    ...(trCont ? { tr_cont: trCont } : {}),
    ...((hashKey ?? ctx.hashKey)
      ? { hashkey: hashKey ?? ctx.hashKey ?? "" }
      : {}),
  };
};

export const overseasGet = async <T>(
  ctx: KisOverseasContext,
  options: OverseasRequestOptions,
): Promise<AxiosResponse<T>> => {
  try {
    return await ctx.http.get<T>(options.path, {
      params: options.params,
      headers: buildHeaders(ctx, options.trId, options.trCont, options.hashKey),
    });
  } catch (error) {
    throw toKisError(
      error,
      options.errorMessage ?? "Failed to fetch overseas data.",
    );
  }
};

export const overseasPost = async <T>(
  ctx: KisOverseasContext,
  options: OverseasRequestOptions,
): Promise<AxiosResponse<T>> => {
  try {
    return await ctx.http.post<T>(
      options.path,
      options.data ?? options.params ?? {},
      {
        headers: buildHeaders(
          ctx,
          options.trId,
          options.trCont,
          options.hashKey,
        ),
      },
    );
  } catch (error) {
    throw toKisError(
      error,
      options.errorMessage ?? "Failed to post overseas data.",
    );
  }
};

export const toArray = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];
  if (value === undefined || value === null) return [];
  return [value as T];
};

export const readField = (
  source: Record<string, unknown> | undefined,
  key: string | undefined,
): string | undefined => {
  if (!source || !key) return undefined;
  const lower = key.toLowerCase();
  const upper = key.toUpperCase();
  const candidate = source[key] ?? source[lower] ?? source[upper];
  return typeof candidate === "string" ? candidate : undefined;
};

export const extractCursor = (
  headers: Record<string, unknown>,
  body: Record<string, unknown>,
  keys: PaginationKeys,
): KisPageCursor => ({
  trCont:
    readField(headers, "tr_cont") ??
    readField(body, "tr_cont") ??
    readField(body, "TR_CONT"),
  fk: readField(body, keys.fk ?? "ctx_area_fk200"),
  nk: readField(body, keys.nk ?? "ctx_area_nk200"),
});

export const shouldContinue = (cursor?: KisPageCursor) =>
  cursor?.trCont === "M" || cursor?.trCont === "F";

export const nextCursor = (
  cursor?: KisPageCursor,
): KisPageCursor | undefined =>
  shouldContinue(cursor)
    ? {
        trCont: "N",
        fk: cursor?.fk,
        nk: cursor?.nk,
      }
    : undefined;

export const resolveEnv = (env?: KisEnvironment): KisEnvironment =>
  env === "demo" || env === "real" ? env : "real";
