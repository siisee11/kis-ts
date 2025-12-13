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

export type ListOverseasReserveOrdersRequest = PaginationConfig & {
  natDv: "us" | "asia";
  cano: string;
  acntPrdtCd: string;
  inqrStrtDt: string;
  inqrEndDt: string;
  inqrDvsnCd: string;
  ovrsExcgCd: string;
  prdtTypeCd?: string;
};

export type ListOverseasReserveOrdersResponse = {
  reservations: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const listOverseasReserveOrders = async (
  ctx: KisOverseasContext,
  request: ListOverseasReserveOrdersRequest,
): Promise<ListOverseasReserveOrdersResponse> => {
  const trId = request.natDv === "us" ? "TTTT3039R" : "TTTS3014R";
  const reservations: Record<string, unknown>[] = [];

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
      path: "/uapi/overseas-stock/v1/trading/order-resv-list",
      trId,
      trCont: cursor.trCont,
      params: {
        CANO: request.cano,
        ACNT_PRDT_CD: request.acntPrdtCd,
        INQR_STRT_DT: request.inqrStrtDt,
        INQR_END_DT: request.inqrEndDt,
        INQR_DVSN_CD: request.inqrDvsnCd,
        OVRS_EXCG_CD: request.ovrsExcgCd,
        PRDT_TYPE_CD: request.prdtTypeCd ?? "",
        [cursorKeys.fk]: cursor.fk ?? "",
        [cursorKeys.nk]: cursor.nk ?? "",
      },
      errorMessage: "Failed to list overseas reserve orders.",
    });

    const body = (response.data ?? {}) as Record<string, unknown>;
    reservations.push(...toArray<Record<string, unknown>>(body.output));

    const extracted = extractCursor(
      response.headers as Record<string, unknown>,
      body,
      cursorKeys,
    );
    next = nextCursor(extracted);
    if (!shouldContinue(extracted) || request.autoPaginate === false) break;
    cursor = next ?? { trCont: "", fk: "", nk: "" };
  }

  return { reservations, next };
};
