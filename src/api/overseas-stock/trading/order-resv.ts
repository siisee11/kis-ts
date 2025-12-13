import { KisError } from "../../../errors";
import type { KisEnvironment } from "../../../types";
import type { KisOverseasContext } from "../helpers";
import { overseasPost, toArray } from "../helpers";

export type PlaceOverseasReserveOrderRequest = {
  env: KisEnvironment;
  ordDv: "usBuy" | "usSell" | "asia";
  cano: string;
  acntPrdtCd: string;
  pdno: string;
  ovrsExcgCd: string;
  ftOrdQty: string;
  ftOrdUnpr3: string;
  sllBuyDvsnCd?: string;
  rvseCnclDvsnCd?: string;
  prdtTypeCd?: string;
  ordSvrDvsnCd?: string;
  rsvnOrdRcitDt?: string;
  ordDvsn?: string;
  ovrsRsvnOdno?: string;
  algoOrdTmdDvsnCd?: string;
  hashKey?: string;
};

export type PlaceOverseasReserveOrderResponse = Record<string, unknown>[];

const resolveReserveOrderTrId = (
  env: KisEnvironment,
  ordDv: PlaceOverseasReserveOrderRequest["ordDv"],
): string => {
  if (ordDv === "usBuy") return env === "demo" ? "VTTT3014U" : "TTTT3014U";
  if (ordDv === "usSell") return env === "demo" ? "VTTT3016U" : "TTTT3016U";
  if (ordDv === "asia") return env === "demo" ? "VTTS3013U" : "TTTS3013U";
  throw new KisError("ordDv must be one of usBuy, usSell, or asia.");
};

export const placeOverseasReserveOrder = async (
  ctx: KisOverseasContext,
  request: PlaceOverseasReserveOrderRequest,
): Promise<PlaceOverseasReserveOrderResponse> => {
  const trId = resolveReserveOrderTrId(request.env, request.ordDv);

  const response = await overseasPost<Record<string, unknown>>(ctx, {
    path: "/uapi/overseas-stock/v1/trading/order-resv",
    trId,
    data: {
      CANO: request.cano,
      ACNT_PRDT_CD: request.acntPrdtCd,
      PDNO: request.pdno,
      OVRS_EXCG_CD: request.ovrsExcgCd,
      FT_ORD_QTY: request.ftOrdQty,
      FT_ORD_UNPR3: request.ftOrdUnpr3,
      ...(request.sllBuyDvsnCd
        ? { SLL_BUY_DVSN_CD: request.sllBuyDvsnCd }
        : {}),
      ...(request.rvseCnclDvsnCd
        ? { RVSE_CNCL_DVSN_CD: request.rvseCnclDvsnCd }
        : {}),
      ...(request.prdtTypeCd ? { PRDT_TYPE_CD: request.prdtTypeCd } : {}),
      ...(request.ordSvrDvsnCd
        ? { ORD_SVR_DVSN_CD: request.ordSvrDvsnCd }
        : {}),
      ...(request.rsvnOrdRcitDt
        ? { RSVN_ORD_RCIT_DT: request.rsvnOrdRcitDt }
        : {}),
      ...(request.ordDvsn ? { ORD_DVSN: request.ordDvsn } : {}),
      ...(request.ovrsRsvnOdno ? { OVRS_RSVN_ODNO: request.ovrsRsvnOdno } : {}),
      ...(request.algoOrdTmdDvsnCd
        ? { ALGO_ORD_TMD_DVSN_CD: request.algoOrdTmdDvsnCd }
        : {}),
    },
    hashKey: request.hashKey,
    errorMessage: "Failed to place overseas reserve order.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  return toArray<Record<string, unknown>>(body.output);
};
