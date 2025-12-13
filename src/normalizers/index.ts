import type { KisAuthToken } from "../types";

export type KisRawAuthToken = {
  access_token?: string;
  token_type?: string;
  expires_in?: number | string;
  scope?: string;
  timestamp?: number | string;
};

export const toNumber = (value: unknown): number => {
  const normalized =
    typeof value === "string" ? value.replace(/,/g, "").trim() : value;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const normalizeAuthToken = (raw: KisRawAuthToken): KisAuthToken => ({
  accessToken: raw.access_token ?? "",
  tokenType: raw.token_type ?? "Bearer",
  expiresIn: toNumber(raw.expires_in ?? 0),
  scope: raw.scope,
  issuedAt: raw.timestamp ? toNumber(raw.timestamp) : Date.now(),
});
