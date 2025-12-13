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

export type CheckHolidayRequest = PaginationConfig & {
  bassDt: string;
};

export type CheckHolidayResponse = {
  holidays: Record<string, unknown>[];
  next?: KisPageCursor;
};

export const checkHoliday = async (
  ctx: KisDomesticContext,
  request: CheckHolidayRequest,
): Promise<CheckHolidayResponse> => {
  const trId = "CTCA0903R";
  const holidays: Record<string, unknown>[] = [];

  const cursorKeys = {
    fk: request.cursorKeys?.fk ?? "CTX_AREA_FK",
    nk: request.cursorKeys?.nk ?? "CTX_AREA_NK",
  };

  let cursor: KisPageCursor = {
    trCont: request.cursor?.trCont ?? "",
    fk: request.cursor?.fk ?? "",
    nk: request.cursor?.nk ?? "",
  };
  let next: KisPageCursor | undefined;
  const maxPages = request.maxPages ?? defaultMaxPages;

  for (let page = 0; page < maxPages; page += 1) {
    const response = await domesticGet<Record<string, unknown>>(ctx, {
      path: "/uapi/domestic-stock/v1/quotations/chk-holiday",
      trId,
      trCont: cursor.trCont,
      params: {
        BASS_DT: request.bassDt,
        [cursorKeys.fk]: cursor.fk ?? "",
        [cursorKeys.nk]: cursor.nk ?? "",
      },
      errorMessage: "Failed to check domestic holidays.",
    });

    const body = (response.data ?? {}) as Record<string, unknown>;
    holidays.push(...toArray<Record<string, unknown>>(body.output));

    const extracted = extractCursor(
      response.headers as Record<string, unknown>,
      body,
      cursorKeys,
    );
    next = nextCursor(extracted);
    if (!shouldContinue(extracted) || request.autoPaginate === false) break;
    cursor = next ?? { trCont: "", fk: "", nk: "" };
  }

  return { holidays, next };
};
