import type { KisEnvironment } from "../../../types";
import {
  domesticGet,
  type KisDomesticContext,
  resolveEnv,
  toArray,
} from "../helpers";

export type InquirePsblOrderRequest = {
  env?: KisEnvironment;
  cano: string;
  acntPrdtCd: string;
  pdno: string;
  ordUnpr: string;
  ordDvsn: string;
  cmaEvluAmtIcldYn: string;
  ovrsIcldYn: string;
};

export type InquirePsblOrderResponse = Record<string, unknown>;

export const inquirePsblOrder = async (
  ctx: KisDomesticContext,
  request: InquirePsblOrderRequest,
): Promise<InquirePsblOrderResponse> => {
  const env = resolveEnv(request.env);
  const trId = env === "demo" ? "VTTC8908R" : "TTTC8908R";

  const response = await domesticGet<Record<string, unknown>>(ctx, {
    path: "/uapi/domestic-stock/v1/trading/inquire-psbl-order",
    trId,
    params: {
      CANO: request.cano,
      ACNT_PRDT_CD: request.acntPrdtCd,
      PDNO: request.pdno,
      ORD_UNPR: request.ordUnpr,
      ORD_DVSN: request.ordDvsn,
      CMA_EVLU_AMT_ICLD_YN: request.cmaEvluAmtIcldYn,
      OVRS_ICLD_YN: request.ovrsIcldYn,
    },
    errorMessage: "Failed to inquire domestic order availability.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  const [result] = toArray<Record<string, unknown>>(body.output);
  return result ?? {};
};
