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

export type InquireOverseasPeriodTransRequest = PaginationConfig & {
  cano: string;
  acntPrdtCd: string;
  erlmStrtDt: string;
  erlmEndDt: string;
  ovrsExcgCd: string;
  pdno: string;
  sllBuyDvsnCd: string;
  loanDvsnCd: string;
};

export type InquireOverseasPeriodTransResponse = {
  summary: Record<string, unknown>[];
  details: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const inquireOverseasPeriodTrans = async (
  ctx: KisOverseasContext,
  request: InquireOverseasPeriodTransRequest,
): Promise<InquireOverseasPeriodTransResponse> => {
  const trId = "CTOS4001R";
  const summary: Record<string, unknown>[] = [];
  const details: Record<string, unknown>[] = [];

  let cursor: KisPageCursor = {
    trCont: request.cursor?.trCont ?? "",
    fk: request.cursor?.fk ?? "",
    nk: request.cursor?.nk ?? "",
  };
  let next: KisPageCursor | undefined;
  const cursorKeys = {
    fk: request.cursorKeys?.fk ?? "ctx_area_fk100",
    nk: request.cursorKeys?.nk ?? "ctx_area_nk100",
  };
  const maxPages = request.maxPages ?? defaultMaxPages;

  for (let page = 0; page < maxPages; page += 1) {
    const response = await overseasGet<Record<string, unknown>>(ctx, {
      path: "/uapi/overseas-stock/v1/trading/inquire-period-trans",
      trId,
      trCont: cursor.trCont,
      params: {
        CANO: request.cano,
        ACNT_PRDT_CD: request.acntPrdtCd,
        ERLM_STRT_DT: request.erlmStrtDt,
        ERLM_END_DT: request.erlmEndDt,
        OVRS_EXCG_CD: request.ovrsExcgCd,
        PDNO: request.pdno,
        SLL_BUY_DVSN_CD: request.sllBuyDvsnCd,
        LOAN_DVSN_CD: request.loanDvsnCd,
        [cursorKeys.fk]: cursor.fk ?? "",
        [cursorKeys.nk]: cursor.nk ?? "",
      },
      errorMessage: "Failed to fetch overseas period transactions.",
    });

    const body = (response.data ?? {}) as Record<string, unknown>;
    summary.push(...toArray<Record<string, unknown>>(body.output1));
    details.push(...toArray<Record<string, unknown>>(body.output2));

    const extracted = extractCursor(
      response.headers as Record<string, unknown>,
      body,
      cursorKeys,
    );
    next = nextCursor(extracted);
    if (!shouldContinue(extracted) || request.autoPaginate === false) break;
    cursor = next ?? { trCont: "", fk: "", nk: "" };
  }

  return { summary, details, next };
};
