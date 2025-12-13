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

export type InquireOverseasNccsRequest = PaginationConfig & {
  cano: string;
  acntPrdtCd: string;
  ovrsExcgCd: string;
  sortSqn: string;
  env?: KisEnvironment;
};

export type InquireOverseasNccsResponse = {
  orders: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const inquireOverseasNccs = async (
  ctx: KisOverseasContext,
  request: InquireOverseasNccsRequest,
): Promise<InquireOverseasNccsResponse> => {
  const trId = "TTTS3018R";
  const orders: Record<string, unknown>[] = [];

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
      path: "/uapi/overseas-stock/v1/trading/inquire-nccs",
      trId,
      trCont: cursor.trCont,
      params: {
        CANO: request.cano,
        ACNT_PRDT_CD: request.acntPrdtCd,
        OVRS_EXCG_CD: request.ovrsExcgCd,
        SORT_SQN: request.sortSqn,
        [cursorKeys.fk]: cursor.fk ?? "",
        [cursorKeys.nk]: cursor.nk ?? "",
      },
      errorMessage: "Failed to fetch overseas open orders.",
    });

    const body = (response.data ?? {}) as Record<string, unknown>;
    orders.push(...toArray<Record<string, unknown>>(body.output));

    const extracted = extractCursor(
      response.headers as Record<string, unknown>,
      body,
      cursorKeys,
    );
    next = nextCursor(extracted);
    if (!shouldContinue(extracted) || request.autoPaginate === false) break;
    cursor = next ?? { trCont: "", fk: "", nk: "" };
  }

  return { orders, next };
};
