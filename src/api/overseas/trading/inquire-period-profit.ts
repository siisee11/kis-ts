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

export type InquireOverseasPeriodProfitRequest = PaginationConfig & {
  cano: string;
  acntPrdtCd: string;
  ovrsExcgCd: string;
  natnCd: string;
  crcyCd: string;
  pdno: string;
  inqrStrtDt: string;
  inqrEndDt: string;
  wcrcFrcrDvsnCd: string;
};

export type InquireOverseasPeriodProfitResponse = {
  summary: Record<string, unknown>[];
  details: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const inquireOverseasPeriodProfit = async (
  ctx: KisOverseasContext,
  request: InquireOverseasPeriodProfitRequest,
): Promise<InquireOverseasPeriodProfitResponse> => {
  const trId = "TTTS3039R";
  const summary: Record<string, unknown>[] = [];
  const details: Record<string, unknown>[] = [];

  let cursor: KisPageCursor = {
    trCont: request.cursor?.trCont ?? "",
    fk: request.cursor?.fk ?? "",
    nk: request.cursor?.nk ?? "",
  };
  let next: KisPageCursor | undefined;
  const cursorKeys = {
    fk: request.cursorKeys?.fk ?? "ctx_area_fk200",
    nk: request.cursorKeys?.nk ?? "ctx_area_nk200",
  };
  const maxPages = request.maxPages ?? defaultMaxPages;

  for (let page = 0; page < maxPages; page += 1) {
    const response = await overseasGet<Record<string, unknown>>(ctx, {
      path: "/uapi/overseas-stock/v1/trading/inquire-period-profit",
      trId,
      trCont: cursor.trCont,
      params: {
        CANO: request.cano,
        ACNT_PRDT_CD: request.acntPrdtCd,
        OVRS_EXCG_CD: request.ovrsExcgCd,
        NATN_CD: request.natnCd,
        CRCY_CD: request.crcyCd,
        PDNO: request.pdno,
        INQR_STRT_DT: request.inqrStrtDt,
        INQR_END_DT: request.inqrEndDt,
        WCRC_FRCR_DVSN_CD: request.wcrcFrcrDvsnCd,
        [cursorKeys.fk]: cursor.fk ?? "",
        [cursorKeys.nk]: cursor.nk ?? "",
      },
      errorMessage: "Failed to fetch overseas period profit.",
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
