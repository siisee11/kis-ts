import { KisError } from "../../../errors";
import type { KisEnvironment } from "../../../types";
import {
  domesticPost,
  type KisDomesticContext,
  resolveEnv,
  toArray,
} from "../helpers";

export type PlaceDomesticCashOrderRequest = {
  env?: KisEnvironment;
  ordDv: "buy" | "sell";
  cano: string;
  acntPrdtCd: string;
  pdno: string;
  ordDvsn: string;
  ordQty: string;
  ordUnpr: string;
  excgIdDvsnCd: string;
  sllType?: string;
  cndtPric?: string;
  hashKey?: string;
};

export type PlaceDomesticCashOrderResponse = Record<string, unknown>[];

const resolveCashOrderTrId = (
  env: KisEnvironment,
  ordDv: PlaceDomesticCashOrderRequest["ordDv"],
) => {
  if (env === "real") {
    if (ordDv === "sell") return "TTTC0011U";
    if (ordDv === "buy") return "TTTC0012U";
  }
  if (env === "demo") {
    if (ordDv === "sell") return "VTTC0011U";
    if (ordDv === "buy") return "VTTC0012U";
  }
  throw new KisError("Unsupported environment or order side for cash order.");
};

export const placeDomesticCashOrder = async (
  ctx: KisDomesticContext,
  request: PlaceDomesticCashOrderRequest,
): Promise<PlaceDomesticCashOrderResponse> => {
  const env = resolveEnv(request.env);
  const trId = resolveCashOrderTrId(env, request.ordDv);

  const response = await domesticPost<Record<string, unknown>>(ctx, {
    path: "/uapi/domestic-stock/v1/trading/order-cash",
    trId,
    data: {
      CANO: request.cano,
      ACNT_PRDT_CD: request.acntPrdtCd,
      PDNO: request.pdno,
      ORD_DVSN: request.ordDvsn,
      ORD_QTY: request.ordQty,
      ORD_UNPR: request.ordUnpr,
      EXCG_ID_DVSN_CD: request.excgIdDvsnCd,
      SLL_TYPE: request.sllType ?? "",
      CNDT_PRIC: request.cndtPric ?? "",
    },
    hashKey: request.hashKey,
    errorMessage: "Failed to place domestic cash order.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  return toArray<Record<string, unknown>>(body.output);
};
