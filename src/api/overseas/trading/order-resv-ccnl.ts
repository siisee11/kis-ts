import type { KisEnvironment } from "../../../types";
import type { KisOverseasContext } from "../helpers";
import { overseasPost, toArray } from "../helpers";

export type CancelOverseasReserveOrderRequest = {
  env: KisEnvironment;
  natDv: "us";
  cano: string;
  acntPrdtCd: string;
  rsvnOrdRcitDt: string;
  ovrsRsvnOdno: string;
  hashKey?: string;
};

export type CancelOverseasReserveOrderResponse = Record<string, unknown>[];

export const cancelOverseasReserveOrder = async (
  ctx: KisOverseasContext,
  request: CancelOverseasReserveOrderRequest,
): Promise<CancelOverseasReserveOrderResponse> => {
  const trId = request.env === "demo" ? "VTTT3017U" : "TTTT3017U";

  const response = await overseasPost<Record<string, unknown>>(ctx, {
    path: "/uapi/overseas-stock/v1/trading/order-resv-ccnl",
    trId,
    data: {
      CANO: request.cano,
      ACNT_PRDT_CD: request.acntPrdtCd,
      RSVN_ORD_RCIT_DT: request.rsvnOrdRcitDt,
      OVRS_RSVN_ODNO: request.ovrsRsvnOdno,
    },
    hashKey: request.hashKey,
    errorMessage: "Failed to cancel overseas reserve order.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  return toArray<Record<string, unknown>>(body.output);
};
