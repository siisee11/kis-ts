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

export type InquireOverseasCcnlRequest = PaginationConfig & {
  cano: string;
  acntPrdtCd: string;
  pdno: string;
  ordStrtDt: string;
  ordEndDt: string;
  sllBuyDvsn: string;
  ccldNccsDvsn: string;
  sortSqn: string;
  ordDt: string;
  ordGnoBrno: string;
  odno: string;
  ovrsExcgCd?: string;
  env?: KisEnvironment;
};

export type InquireOverseasCcnlResponse = {
  executions: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const inquireOverseasCcnl = async (
  ctx: KisOverseasContext,
  request: InquireOverseasCcnlRequest,
): Promise<InquireOverseasCcnlResponse> => {
  const env = request.env ?? "real";
  const trId = env === "demo" ? "VTTS3035R" : "TTTS3035R";
  const executions: Record<string, unknown>[] = [];

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
      path: "/uapi/overseas-stock/v1/trading/inquire-ccnl",
      trId,
      trCont: cursor.trCont,
      params: {
        CANO: request.cano,
        ACNT_PRDT_CD: request.acntPrdtCd,
        PDNO: request.pdno,
        ORD_STRT_DT: request.ordStrtDt,
        ORD_END_DT: request.ordEndDt,
        SLL_BUY_DVSN: request.sllBuyDvsn,
        CCLD_NCCS_DVSN: request.ccldNccsDvsn,
        OVRS_EXCG_CD: request.ovrsExcgCd ?? "",
        SORT_SQN: request.sortSqn,
        ORD_DT: request.ordDt,
        ORD_GNO_BRNO: request.ordGnoBrno,
        ODNO: request.odno,
        [cursorKeys.fk]: cursor.fk ?? "",
        [cursorKeys.nk]: cursor.nk ?? "",
      },
      errorMessage: "Failed to fetch overseas order history.",
    });

    const body = (response.data ?? {}) as Record<string, unknown>;
    executions.push(...toArray<Record<string, unknown>>(body.output));

    const extracted = extractCursor(
      response.headers as Record<string, unknown>,
      body,
      cursorKeys,
    );
    next = nextCursor(extracted);
    if (!shouldContinue(extracted) || request.autoPaginate === false) break;
    cursor = next ?? { trCont: "", fk: "", nk: "" };
  }

  return { executions, next };
};
