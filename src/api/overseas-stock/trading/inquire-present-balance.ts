import type { KisEnvironment } from "../../../types";
import type {
  KisOverseasContext,
  KisPageCursor,
  PaginationConfig,
} from "../helpers";
import {
  defaultMaxPages,
  extractCursor,
  nextCursor,
  overseasGet,
  shouldContinue,
  toArray,
} from "../helpers";

export type InquireOverseasPresentBalanceRequest = PaginationConfig & {
  cano: string;
  acntPrdtCd: string;
  wcrcFrcrDvsnCd: string;
  natnCd: string;
  trMketCd: string;
  inqrDvsnCd: string;
  env?: KisEnvironment;
};

export type InquireOverseasPresentBalanceResponse = {
  summary: Record<string, unknown>[];
  holdings: Record<string, unknown>[];
  cash: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const inquireOverseasPresentBalance = async (
  ctx: KisOverseasContext,
  request: InquireOverseasPresentBalanceRequest,
): Promise<InquireOverseasPresentBalanceResponse> => {
  const env = request.env ?? "real";
  const trId = env === "demo" ? "VTRP6504R" : "CTRP6504R";
  const summary: Record<string, unknown>[] = [];
  const holdings: Record<string, unknown>[] = [];
  const cash: Record<string, unknown>[] = [];

  let cursor: KisPageCursor = {
    trCont: request.cursor?.trCont ?? "",
  };
  let next: KisPageCursor | undefined;
  const maxPages = request.maxPages ?? defaultMaxPages;

  for (let page = 0; page < maxPages; page += 1) {
    const response = await overseasGet<Record<string, unknown>>(ctx, {
      path: "/uapi/overseas-stock/v1/trading/inquire-present-balance",
      trId,
      trCont: cursor.trCont,
      params: {
        CANO: request.cano,
        ACNT_PRDT_CD: request.acntPrdtCd,
        WCRC_FRCR_DVSN_CD: request.wcrcFrcrDvsnCd,
        NATN_CD: request.natnCd,
        TR_MKET_CD: request.trMketCd,
        INQR_DVSN_CD: request.inqrDvsnCd,
      },
      errorMessage: "Failed to fetch overseas present balance.",
    });

    const body = (response.data ?? {}) as Record<string, unknown>;
    summary.push(...toArray<Record<string, unknown>>(body.output1));
    holdings.push(...toArray<Record<string, unknown>>(body.output2));
    cash.push(...toArray<Record<string, unknown>>(body.output3));

    const extracted = extractCursor(
      response.headers as Record<string, unknown>,
      body,
      {},
    );
    next = nextCursor(extracted);
    if (!shouldContinue(extracted) || request.autoPaginate === false) break;
    cursor = next ?? { trCont: "" };
  }

  return { summary, holdings, cash, next };
};
