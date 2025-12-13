import { type KisOverseasContext, overseasGet, toArray } from "../helpers";

export type FetchOverseasDailyPriceRequest = {
  excd: string;
  symb: string;
  gubn: "0" | "1";
  bymd?: string;
  modp?: "0" | "1";
  keyb?: string;
};

export type OverseasDailyPriceOutput = {
  rsym?: string;
  zdiv?: string;
  nrec?: string;
};

export type OverseasDailyPriceItem = {
  xymd?: string;
  clos?: string;
  sign?: string;
  diff?: string;
  rate?: string;
  open?: string;
  high?: string;
  low?: string;
  tvol?: string;
  tamt?: string;
  pbid?: string;
  vbid?: string;
  pask?: string;
  vask?: string;
};

export type FetchOverseasDailyPriceResponse = {
  meta: OverseasDailyPriceOutput;
  prices: OverseasDailyPriceItem[];
};

export const fetchOverseasDailyPrice = async (
  ctx: KisOverseasContext,
  request: FetchOverseasDailyPriceRequest,
): Promise<FetchOverseasDailyPriceResponse> => {
  const trId = "HHDFS76240000";

  const response = await overseasGet<Record<string, unknown>>(ctx, {
    path: "/uapi/overseas-price/v1/quotations/dailyprice",
    trId,
    params: {
      AUTH: "",
      EXCD: request.excd,
      SYMB: request.symb,
      GUBN: request.gubn,
      BYMD: request.bymd ?? "",
      MODP: request.modp ?? "0",
      KEYB: request.keyb ?? "",
    },
    errorMessage: "Failed to fetch overseas daily price.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  const [meta] = toArray<OverseasDailyPriceOutput>(body.output1);
  const prices = toArray<OverseasDailyPriceItem>(body.output2);
  return { meta: meta ?? {}, prices };
};
