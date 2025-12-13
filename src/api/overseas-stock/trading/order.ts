import { KisError } from "../../../errors";
import type { KisEnvironment } from "../../../types";
import type { KisOverseasContext } from "../helpers";
import { overseasPost, toArray } from "../helpers";

export type PlaceOverseasOrderRequest = {
  cano: string;
  acntPrdtCd: string;
  ovrsExcgCd:
    | "NASD"
    | "NYSE"
    | "AMEX"
    | "SEHK"
    | "SHAA"
    | "SZAA"
    | "TKSE"
    | "HASE"
    | "VNSE";
  pdno: string;
  ordQty: string;
  ovrsOrdUnpr: string;
  ordDv: "buy" | "sell";
  ctacTlno?: string;
  mgcoAptmOdno?: string;
  ordSvrDvsnCd?: string;
  ordDvsn: string;
  env?: KisEnvironment;
  hashKey?: string;
};

export type PlaceOverseasOrderResponse = Record<string, unknown>[];

const resolveOverseasOrderTrId = (
  ovrsExcgCd: PlaceOverseasOrderRequest["ovrsExcgCd"],
  ordDv: PlaceOverseasOrderRequest["ordDv"],
): string => {
  if (ordDv === "buy") {
    if (ovrsExcgCd === "NASD" || ovrsExcgCd === "NYSE" || ovrsExcgCd === "AMEX")
      return "TTTT1002U";
    if (ovrsExcgCd === "SEHK") return "TTTS1002U";
    if (ovrsExcgCd === "SHAA") return "TTTS0202U";
    if (ovrsExcgCd === "SZAA") return "TTTS0305U";
    if (ovrsExcgCd === "TKSE") return "TTTS0308U";
    if (ovrsExcgCd === "HASE" || ovrsExcgCd === "VNSE") return "TTTS0311U";
  } else if (ordDv === "sell") {
    if (ovrsExcgCd === "NASD" || ovrsExcgCd === "NYSE" || ovrsExcgCd === "AMEX")
      return "TTTT1006U";
    if (ovrsExcgCd === "SEHK") return "TTTS1001U";
    if (ovrsExcgCd === "SHAA") return "TTTS1005U";
    if (ovrsExcgCd === "SZAA") return "TTTS0304U";
    if (ovrsExcgCd === "TKSE") return "TTTS0307U";
    if (ovrsExcgCd === "HASE" || ovrsExcgCd === "VNSE") return "TTTS0310U";
  }
  throw new KisError(
    "Unsupported combination of ordDv and ovrsExcgCd for overseas order.",
  );
};

export const placeOverseasOrder = async (
  ctx: KisOverseasContext,
  request: PlaceOverseasOrderRequest,
): Promise<PlaceOverseasOrderResponse> => {
  const env = request.env ?? "real";
  const baseTrId = resolveOverseasOrderTrId(request.ovrsExcgCd, request.ordDv);
  const trId = env === "demo" ? `V${baseTrId.slice(1)}` : baseTrId;
  const sllType = request.ordDv === "sell" ? "00" : "";

  const response = await overseasPost<Record<string, unknown>>(ctx, {
    path: "/uapi/overseas-stock/v1/trading/order",
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
      SLL_TYPE: sllType,
      ORD_SVR_DVSN_CD: request.ordSvrDvsnCd ?? "0",
      ORD_DVSN: request.ordDvsn,
    },
    hashKey: request.hashKey,
    errorMessage: "Failed to place overseas order.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  return toArray<Record<string, unknown>>(body.output);
};
