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

export type DailyCreditBalanceRequest = PaginationConfig & {
  fidCondMrktDivCode: string;
  fidCondScrDivCode: string;
  fidInputIscd: string;
  fidInputDate1: string;
};

export type DailyCreditBalanceResponse = {
  balances: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const fetchDailyCreditBalance = async (
  ctx: KisDomesticContext,
  request: DailyCreditBalanceRequest,
): Promise<DailyCreditBalanceResponse> => {
  const trId = "FHPST04760000";
  const balances: Record<string, unknown>[] = [];

  let cursor: KisPageCursor = {
    trCont: request.cursor?.trCont ?? "",
  };
  let next: KisPageCursor | undefined;
  const maxPages = request.maxPages ?? defaultMaxPages;

  for (let page = 0; page < maxPages; page += 1) {
    const response = await domesticGet<Record<string, unknown>>(ctx, {
      path: "/uapi/domestic-stock/v1/quotations/daily-credit-balance",
      trId,
      trCont: cursor.trCont,
      params: {
        FID_COND_MRKT_DIV_CODE: request.fidCondMrktDivCode,
        FID_COND_SCR_DIV_CODE: request.fidCondScrDivCode,
        FID_INPUT_ISCD: request.fidInputIscd,
        FID_INPUT_DATE_1: request.fidInputDate1,
      },
      errorMessage: "Failed to fetch domestic daily credit balance.",
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
