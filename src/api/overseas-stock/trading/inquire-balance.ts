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

export type InquireOverseasBalanceRequest = PaginationConfig & {
  cano: string;
  acntPrdtCd: string;
  ovrsExcgCd: string;
  trCrcyCd: string;
  env?: KisEnvironment;
};

export type InquireOverseasBalanceResponse = {
  balances: Record<string, unknown>[];
  evaluations: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const inquireOverseasBalance = async (
  ctx: KisOverseasContext,
  request: InquireOverseasBalanceRequest,
): Promise<InquireOverseasBalanceResponse> => {
  const env = request.env ?? "real";
  const trId = env === "demo" ? "VTTS3012R" : "TTTS3012R";
  const balances: Record<string, unknown>[] = [];
  const evaluations: Record<string, unknown>[] = [];

  let cursor: KisPageCursor = {
    trCont: request.cursor?.trCont ?? "",
    fk: request.cursor?.fk ?? "",
    nk: request.cursor?.nk ?? "",
  };
  let next: KisPageCursor | undefined;

  const maxPages = request.maxPages ?? defaultMaxPages;
  const cursorKeys = {
    fk: request.cursorKeys?.fk ?? "ctx_area_fk200",
    nk: request.cursorKeys?.nk ?? "ctx_area_nk200",
  };

  for (let page = 0; page < maxPages; page += 1) {
    const response = await overseasGet<Record<string, unknown>>(ctx, {
      path: "/uapi/overseas-stock/v1/trading/inquire-balance",
      trId,
      trCont: cursor.trCont,
      params: {
        CANO: request.cano,
        ACNT_PRDT_CD: request.acntPrdtCd,
        OVRS_EXCG_CD: request.ovrsExcgCd,
        TR_CRCY_CD: request.trCrcyCd,
        [cursorKeys.fk]: cursor.fk ?? "",
        [cursorKeys.nk]: cursor.nk ?? "",
      },
      errorMessage: "Failed to fetch overseas balances.",
    });

    const body = (response.data ?? {}) as Record<string, unknown>;
    balances.push(...toArray<Record<string, unknown>>(body.output1));
    evaluations.push(...toArray<Record<string, unknown>>(body.output2));

    const extracted = extractCursor(
      response.headers as Record<string, unknown>,
      body,
      cursorKeys,
    );
    next = nextCursor(extracted);
    if (!shouldContinue(extracted) || request.autoPaginate === false) break;
    cursor = next ?? { trCont: "", fk: "", nk: "" };
  }

  return { balances, evaluations, next };
};
