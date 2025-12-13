import type { KisOverseasContext } from "../helpers";
import { overseasPost, toArray } from "../helpers";

export type PlaceOverseasDaytimeOrderRequest = {
  orderDv: "buy" | "sell";
  cano: string;
  acntPrdtCd: string;
  ovrsExcgCd: string;
  pdno: string;
  ordQty: string;
  ovrsOrdUnpr: string;
  ctacTlno?: string;
  mgcoAptmOdno?: string;
  ordSvrDvsnCd: string;
  ordDvsn: string;
  hashKey?: string;
};

export type PlaceOverseasDaytimeOrderResponse = Record<string, unknown>[];

export const placeOverseasDaytimeOrder = async (
  ctx: KisOverseasContext,
  request: PlaceOverseasDaytimeOrderRequest,
): Promise<PlaceOverseasDaytimeOrderResponse> => {
  const trId = request.orderDv === "buy" ? "TTTS6036U" : "TTTS6037U";

  const response = await overseasPost<Record<string, unknown>>(ctx, {
    path: "/uapi/overseas-stock/v1/trading/daytime-order",
    trId,
    data: {
      CANO: request.cano,
      ACNT_PRDT_CD: request.acntPrdtCd,
      OVRS_EXCG_CD: request.ovrsExcgCd,
      PDNO: request.pdno,
      ORD_QTY: request.ordQty,
      OVRS_ORD_UNPR: request.ovrsOrdUnpr,
      CTAC_TLNO: request.ctacTlno ?? "",
      MGCO_APTM_ODNO: request.mgcoAptmOdno ?? "",
      ORD_SVR_DVSN_CD: request.ordSvrDvsnCd,
      ORD_DVSN: request.ordDvsn,
    },
    hashKey: request.hashKey,
    errorMessage: "Failed to place overseas daytime order.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  return toArray<Record<string, unknown>>(body.output);
};
