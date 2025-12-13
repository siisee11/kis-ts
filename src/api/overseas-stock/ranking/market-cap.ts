import type {
  KisOverseasContext,
  KisPageCursor,
  PaginationConfig,
} from "../helpers";
import {
  defaultMaxPages,
  extractCursor,
  nextCursor,
  overseasGet,
  shouldContinue,
  toArray,
} from "../helpers";

export type FetchOverseasMarketCapRankingRequest = PaginationConfig & {
  excd: string;
  volRang: string;
  keyb?: string;
  auth?: string;
};

export type FetchOverseasMarketCapRankingResponse = {
  meta: Record<string, unknown>[];
  rankings: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const fetchOverseasMarketCapRanking = async (
  ctx: KisOverseasContext,
  request: FetchOverseasMarketCapRankingRequest,
): Promise<FetchOverseasMarketCapRankingResponse> => {
  const trId = "HHDFS76350100";
  const meta: Record<string, unknown>[] = [];
  const rankings: Record<string, unknown>[] = [];

  let cursor: KisPageCursor = {
    trCont: request.cursor?.trCont ?? "",
  };
  let next: KisPageCursor | undefined;
  const maxPages = request.maxPages ?? defaultMaxPages;

  for (let page = 0; page < maxPages; page += 1) {
    const response = await overseasGet<Record<string, unknown>>(ctx, {
      path: "/uapi/overseas-stock/v1/ranking/market-cap",
      trId,
      trCont: cursor.trCont,
      params: {
        EXCD: request.excd,
        VOL_RANG: request.volRang,
        KEYB: request.keyb ?? "",
        AUTH: request.auth ?? "",
      },
      errorMessage: "Failed to fetch overseas market cap ranking.",
    });

    const body = (response.data ?? {}) as Record<string, unknown>;
    meta.push(...toArray<Record<string, unknown>>(body.output1));
    rankings.push(...toArray<Record<string, unknown>>(body.output2));

    const extracted = extractCursor(
      response.headers as Record<string, unknown>,
      body,
      {},
    );
    next = nextCursor(extracted);
    if (!shouldContinue(extracted) || request.autoPaginate === false) break;
    cursor = next ?? { trCont: "" };
  }

  return { meta, rankings, next };
};
