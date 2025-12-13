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

export type InquireOverseasPaymtStdrBalanceRequest = PaginationConfig & {
  cano: string;
  acntPrdtCd: string;
  bassDt: string;
  wcrcFrcrDvsnCd: string;
  inqrDvsnCd: string;
};

export type InquireOverseasPaymtStdrBalanceResponse = {
  summary: Record<string, unknown>[];
  holdings: Record<string, unknown>[];
  cash: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const inquireOverseasPaymtStdrBalance = async (
  ctx: KisOverseasContext,
  request: InquireOverseasPaymtStdrBalanceRequest,
): Promise<InquireOverseasPaymtStdrBalanceResponse> => {
  const trId = "CTRP6010R";
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
      path: "/uapi/overseas-stock/v1/trading/inquire-paymt-stdr-balance",
      trId,
      trCont: cursor.trCont,
      params: {
        CANO: request.cano,
        ACNT_PRDT_CD: request.acntPrdtCd,
        BASS_DT: request.bassDt,
        WCRC_FRCR_DVSN_CD: request.wcrcFrcrDvsnCd,
        INQR_DVSN_CD: request.inqrDvsnCd,
      },
      errorMessage: "Failed to fetch overseas settlement balances.",
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
