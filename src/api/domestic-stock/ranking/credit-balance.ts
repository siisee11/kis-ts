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

export type FetchCreditBalanceRequest = PaginationConfig & {
  fidCondScrDivCode: string;
  fidInputIscd: string;
  fidOption: string;
  fidCondMrktDivCode: string;
  fidRankSortClsCode: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
};

export type FetchCreditBalanceResponse = {
  overview: Record<string, unknown>[];
  details: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const fetchCreditBalance = async (
  ctx: KisDomesticContext,
  request: FetchCreditBalanceRequest,
): Promise<FetchCreditBalanceResponse> => {
  const trId = "FHKST17010000";
  const overview: Record<string, unknown>[] = [];
  const details: Record<string, unknown>[] = [];

  let cursor: KisPageCursor = {
    trCont: request.cursor?.trCont ?? "",
  };
  let next: KisPageCursor | undefined;
  const maxPages = request.maxPages ?? defaultMaxPages;

  for (let page = 0; page < maxPages; page += 1) {
    const response = await domesticGet<Record<string, unknown>>(ctx, {
      path: "/uapi/domestic-stock/v1/ranking/credit-balance",
      trId,
      trCont: cursor.trCont,
      params: {
        FID_COND_SCR_DIV_CODE: request.fidCondScrDivCode,
        FID_INPUT_ISCD: request.fidInputIscd,
        FID_OPTION: request.fidOption,
        FID_COND_MRKT_DIV_CODE: request.fidCondMrktDivCode,
        FID_RANK_SORT_CLS_CODE: request.fidRankSortClsCode,
      },
      errorMessage: "Failed to fetch domestic credit balance ranking.",
    });

    const body = (response.data ?? {}) as Record<string, unknown>;
    overview.push(...toArray<Record<string, unknown>>(body.output1));
    details.push(...toArray<Record<string, unknown>>(body.output2));

    const extracted = extractCursor(
      response.headers as Record<string, unknown>,
      body,
      {},
    );
    next = nextCursor(extracted);
    if (!shouldContinue(extracted) || request.autoPaginate === false) break;
    cursor = next ?? { trCont: "" };
  }

  return { overview, details, next };
};
