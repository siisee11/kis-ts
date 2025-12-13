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

export type InquireOverseasPsamountRequest = PaginationConfig & {
  cano: string;
  acntPrdtCd: string;
  ovrsExcgCd: string;
  ovrsOrdUnpr: string;
  itemCd: string;
  env?: KisEnvironment;
};

export type InquireOverseasPsamountResponse = {
  purchasingPower: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const inquireOverseasPsamount = async (
  ctx: KisOverseasContext,
  request: InquireOverseasPsamountRequest,
): Promise<InquireOverseasPsamountResponse> => {
  const env = request.env ?? "real";
  const trId = env === "demo" ? "VTTS3007R" : "TTTS3007R";
  const purchasingPower: Record<string, unknown>[] = [];

  let cursor: KisPageCursor = {
    trCont: request.cursor?.trCont ?? "",
  };
  let next: KisPageCursor | undefined;
  const maxPages = request.maxPages ?? defaultMaxPages;

  for (let page = 0; page < maxPages; page += 1) {
    const response = await overseasGet<Record<string, unknown>>(ctx, {
      path: "/uapi/overseas-stock/v1/trading/inquire-psamount",
      trId,
      trCont: cursor.trCont,
      params: {
        CANO: request.cano,
        ACNT_PRDT_CD: request.acntPrdtCd,
        OVRS_EXCG_CD: request.ovrsExcgCd,
        OVRS_ORD_UNPR: request.ovrsOrdUnpr,
        ITEM_CD: request.itemCd,
      },
      errorMessage: "Failed to fetch overseas purchase capacity.",
    });

    const body = (response.data ?? {}) as Record<string, unknown>;
    purchasingPower.push(...toArray<Record<string, unknown>>(body.output));

    const extracted = extractCursor(
      response.headers as Record<string, unknown>,
      body,
      {},
    );
    next = nextCursor(extracted);
    if (!shouldContinue(extracted) || request.autoPaginate === false) break;
    cursor = next ?? { trCont: "" };
  }

  return { purchasingPower, next };
};
