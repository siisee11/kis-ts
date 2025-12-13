import {
  defaultMaxPages,
  domesticGet,
  extractCursor,
  type KisDomesticContext,
  type KisPageCursor,
  nextCursor,
  type PaginationConfig,
  shouldContinue,
  toArray,
} from "../helpers";

export type FetchBulkTransactionCountRequest = PaginationConfig & {
  fidAplyRangPrc2: string;
  fidCondMrktDivCode: string;
  fidCondScrDivCode: string;
  fidInputIscd: string;
  fidRankSortClsCode: string;
  fidDivClsCode: string;
  fidInputPrice1: string;
  fidAplyRangPrc1: string;
  fidInputIscd2: string;
  fidTrgtExlsClsCode: string;
  fidTrgtClsCode: string;
  fidVolCnt: string;
};

export type FetchBulkTransactionCountResponse = {
  rankings: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const fetchBulkTransactionCount = async (
  ctx: KisDomesticContext,
  request: FetchBulkTransactionCountRequest,
): Promise<FetchBulkTransactionCountResponse> => {
  const trId = "FHKST190900C0";
  const rankings: Record<string, unknown>[] = [];

  let cursor: KisPageCursor = {
    trCont: request.cursor?.trCont ?? "",
  };
  let next: KisPageCursor | undefined;
  const maxPages = request.maxPages ?? defaultMaxPages;

  for (let page = 0; page < maxPages; page += 1) {
    const response = await domesticGet<Record<string, unknown>>(ctx, {
      path: "/uapi/domestic-stock/v1/ranking/bulk-trans-num",
      trId,
      trCont: cursor.trCont,
      params: {
        fid_aply_rang_prc_2: request.fidAplyRangPrc2,
        fid_cond_mrkt_div_code: request.fidCondMrktDivCode,
        fid_cond_scr_div_code: request.fidCondScrDivCode,
        fid_input_iscd: request.fidInputIscd,
        fid_rank_sort_cls_code: request.fidRankSortClsCode,
        fid_div_cls_code: request.fidDivClsCode,
        fid_input_price_1: request.fidInputPrice1,
        fid_aply_rang_prc_1: request.fidAplyRangPrc1,
        fid_input_iscd_2: request.fidInputIscd2,
        fid_trgt_exls_cls_code: request.fidTrgtExlsClsCode,
        fid_trgt_cls_code: request.fidTrgtClsCode,
        fid_vol_cnt: request.fidVolCnt,
      },
      errorMessage: "Failed to fetch domestic bulk transaction ranking.",
    });

    const body = (response.data ?? {}) as Record<string, unknown>;
    rankings.push(...toArray<Record<string, unknown>>(body.output));

    const extracted = extractCursor(
      response.headers as Record<string, unknown>,
      body,
      {},
    );
    next = nextCursor(extracted);
    if (!shouldContinue(extracted) || request.autoPaginate === false) break;
    cursor = next ?? { trCont: "" };
  }

  return { rankings, next };
};
