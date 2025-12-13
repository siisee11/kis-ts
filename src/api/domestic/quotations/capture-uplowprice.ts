import { domesticGet, type KisDomesticContext, toArray } from "../helpers";

export type CaptureUplowpriceRequest = {
  fidCondMrktDivCode: string;
  fidCondScrDivCode: string;
  fidPrcClsCode: string;
  fidDivClsCode: string;
  fidInputIscd: string;
  fidTrgtClsCode?: string;
  fidTrgtExlsClsCode?: string;
  fidInputPrice1?: string;
  fidInputPrice2?: string;
  fidVolCnt?: string;
};

export type CaptureUplowpriceResponse = Record<string, unknown>[];

export const captureUplowprice = async (
  ctx: KisDomesticContext,
  request: CaptureUplowpriceRequest,
): Promise<CaptureUplowpriceResponse> => {
  const trId = "FHKST130000C0";

  const response = await domesticGet<Record<string, unknown>>(ctx, {
    path: "/uapi/domestic-stock/v1/quotations/capture-uplowprice",
    trId,
    params: {
      FID_COND_MRKT_DIV_CODE: request.fidCondMrktDivCode,
      FID_COND_SCR_DIV_CODE: request.fidCondScrDivCode,
      FID_PRC_CLS_CODE: request.fidPrcClsCode,
      FID_DIV_CLS_CODE: request.fidDivClsCode,
      FID_INPUT_ISCD: request.fidInputIscd,
      FID_TRGT_CLS_CODE: request.fidTrgtClsCode ?? "",
      FID_TRGT_EXLS_CLS_CODE: request.fidTrgtExlsClsCode ?? "",
      FID_INPUT_PRICE_1: request.fidInputPrice1 ?? "",
      FID_INPUT_PRICE_2: request.fidInputPrice2 ?? "",
      FID_VOL_CNT: request.fidVolCnt ?? "",
    },
    errorMessage: "Failed to capture domestic upper/lower price.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  return toArray<Record<string, unknown>>(body.output);
};
