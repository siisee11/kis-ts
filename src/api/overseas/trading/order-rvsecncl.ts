import type { KisEnvironment } from "../../../types";
import type { KisOverseasContext } from "../helpers";
import { overseasPost, toArray } from "../helpers";
import type { PlaceOverseasOrderRequest } from "./order";

export type ReviseCancelOverseasOrderRequest = {
  cano: string;
  acntPrdtCd: string;
  ovrsExcgCd: PlaceOverseasOrderRequest["ovrsExcgCd"];
  pdno: string;
  orgnOdno: string;
  rvseCnclDvsnCd: "01" | "02";
  ordQty: string;
  ovrsOrdUnpr: string;
  mgcoAptmOdno?: string;
  ordSvrDvsnCd?: string;
  env?: KisEnvironment;
  hashKey?: string;
};

export type ReviseCancelOverseasOrderResponse = Record<string, unknown>[];

export const reviseCancelOverseasOrder = async (
  ctx: KisOverseasContext,
  request: ReviseCancelOverseasOrderRequest,
): Promise<ReviseCancelOverseasOrderResponse> => {
  const env = request.env ?? "real";
  const trId = env === "demo" ? "VTTT1004U" : "TTTT1004U";

  const response = await overseasPost<Record<string, unknown>>(ctx, {
    path: "/uapi/overseas-stock/v1/trading/order-rvsecncl",
    trId,
    data: {
      CANO: request.cano,
      ACNT_PRDT_CD: request.acntPrdtCd,
      OVRS_EXCG_CD: request.ovrsExcgCd,
      PDNO: request.pdno,
      ORGN_ODNO: request.orgnOdno,
      RVSE_CNCL_DVSN_CD: request.rvseCnclDvsnCd,
      ORD_QTY: request.ordQty,
      OVRS_ORD_UNPR: request.ovrsOrdUnpr,
      MGCO_APTM_ODNO: request.mgcoAptmOdno ?? "",
      ORD_SVR_DVSN_CD: request.ordSvrDvsnCd ?? "0",
    },
    hashKey: request.hashKey,
    errorMessage: "Failed to revise/cancel overseas order.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  return toArray<Record<string, unknown>>(body.output);
};
