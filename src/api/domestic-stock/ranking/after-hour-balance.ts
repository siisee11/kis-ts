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

export type FetchAfterHourBalanceRequest = PaginationConfig & {
  fidInputPrice1: string;
  fidCondMrktDivCode: string;
  fidCondScrDivCode: string;
  fidRankSortClsCode: string;
  fidDivClsCode: string;
  fidInputIscd: string;
  fidTrgtExlsClsCode: string;
  fidTrgtClsCode: string;
  fidVolCnt: string;
  fidInputPrice2: string;
};

export type FetchAfterHourBalanceResponse = {
  balances: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const fetchAfterHourBalance = async (
  ctx: KisDomesticContext,
  request: FetchAfterHourBalanceRequest,
): Promise<FetchAfterHourBalanceResponse> => {
  const trId = "FHPST01760000";
  const balances: Record<string, unknown>[] = [];

  let cursor: KisPageCursor = {
    trCont: request.cursor?.trCont ?? "",
  };
  let next: KisPageCursor | undefined;
  const maxPages = request.maxPages ?? defaultMaxPages;

  for (let page = 0; page < maxPages; page += 1) {
    const response = await domesticGet<Record<string, unknown>>(ctx, {
      path: "/uapi/domestic-stock/v1/ranking/after-hour-balance",
      trId,
      trCont: cursor.trCont,
      params: {
        fid_input_price_1: request.fidInputPrice1,
        fid_cond_mrkt_div_code: request.fidCondMrktDivCode,
        fid_cond_scr_div_code: request.fidCondScrDivCode,
        fid_rank_sort_cls_code: request.fidRankSortClsCode,
        fid_div_cls_code: request.fidDivClsCode,
        fid_input_iscd: request.fidInputIscd,
        fid_trgt_exls_cls_code: request.fidTrgtExlsClsCode,
        fid_trgt_cls_code: request.fidTrgtClsCode,
        fid_vol_cnt: request.fidVolCnt,
        fid_input_price_2: request.fidInputPrice2,
      },
      errorMessage: "Failed to fetch domestic after-hour balance ranking.",
    });

    const body = (response.data ?? {}) as Record<string, unknown>;
    balances.push(...toArray<Record<string, unknown>>(body.output));

    const extracted = extractCursor(
      response.headers as Record<string, unknown>,
      body,
      {},
    );
    next = nextCursor(extracted);
    if (!shouldContinue(extracted) || request.autoPaginate === false) break;
    cursor = next ?? { trCont: "" };
  }

  return { balances, next };
};
