import type { KisOverseasContext } from "../helpers";
import { overseasPost, toArray } from "../helpers";

export type ReviseCancelOverseasDaytimeOrderRequest = {
  cano: string;
  acntPrdtCd: string;
  ovrsExcgCd: string;
  pdno: string;
  orgnOdno: string;
  rvseCnclDvsnCd: "01" | "02";
  ordQty: string;
  ovrsOrdUnpr: string;
  ctacTlno?: string;
  mgcoAptmOdno?: string;
  ordSvrDvsnCd: string;
  hashKey?: string;
};

export type ReviseCancelOverseasDaytimeOrderResponse = Record<
  string,
  unknown
>[];

export const reviseCancelOverseasDaytimeOrder = async (
  ctx: KisOverseasContext,
  request: ReviseCancelOverseasDaytimeOrderRequest,
): Promise<ReviseCancelOverseasDaytimeOrderResponse> => {
  const trId = "TTTS6038U";

  const response = await overseasPost<Record<string, unknown>>(ctx, {
    path: "/uapi/overseas-stock/v1/trading/daytime-order-rvsecncl",
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
      CTAC_TLNO: request.ctacTlno ?? "",
      MGCO_APTM_ODNO: request.mgcoAptmOdno ?? "",
      ORD_SVR_DVSN_CD: request.ordSvrDvsnCd,
    },
    hashKey: request.hashKey,
    errorMessage: "Failed to revise/cancel overseas daytime order.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  return toArray<Record<string, unknown>>(body.output);
};
