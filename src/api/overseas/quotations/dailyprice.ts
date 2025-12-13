import { type KisOverseasContext, overseasGet, toArray } from "../helpers";

export type FetchOverseasDailyPriceRequest = {
  /**
   * 거래소코드
   * HKS : 홍콩
   * NYS : 뉴욕
   * NAS : 나스닥
   * AMS : 아멕스
   * TSE : 도쿄
   * SHS : 상해
   * SZS : 심천
   * SHI : 상해지수
   * SZI : 심천지수
   * HSX : 호치민
   * HNX : 하노이
   * BAY : 뉴욕(주간)
   * BAQ : 나스닥(주간)
   * BAA : 아멕스(주간)
   */
  excd: string;
  /** 종목코드 */
  symb: string;
  /**
   * 기간분류코드
   * 0 : 30일
   * 1 : 90일
   */
  gubn: "0" | "1";
  /** 기준일자 (YYYYMMDD) */
  bymd?: string;
  /** 수정주가반영여부 (0:반영, 1:미반영) */
  modp?: "0" | "1";
  /** 기준일자입력Key (공란) */
  keyb?: string;
};

export type OverseasDailyPriceOutput = {
  /** 종목코드 */
  rsym?: string;
  /** 소수점자리수 */
  zdiv?: string;
  /** 전일종가 */
  nrec?: string;
};

export type OverseasDailyPriceItem = {
  /** 일자 */
  xymd?: string;
  /** 종가 */
  clos?: string;
  /** 대비기호 (1:상한, 2:상승, 3:보합, 4:하한, 5:하락) */
  sign?: string;
  /** 대비 *
  diff?: string;
  /** 등락율 */
  rate?: string;
  /** 시가 */
  open?: string;
  /** 고가 */
  high?: string;
  /** 저가 */
  low?: string;
  /** 거래량 */
  tvol?: string;
  /** 거래대금 */
  tamt?: string;
  /** 매수호가 */
  pbid?: string;
  /** 매수호가잔량 */
  vbid?: string;
  /** 매도호가 */
  pask?: string;
  /** 매도호가잔량 */
  vask?: string;
};

export type FetchOverseasDailyPriceResponse = {
  /** 응답상세1 (종목정보) */
  meta: OverseasDailyPriceOutput;
  /** 응답상세2 (일별시세) */
  prices: OverseasDailyPriceItem[];
};

/**
 * 해외주식 기간별시세 [v1_해외주식-010]
 *
 * 해외주식의 기간별시세를 확인하는 API 입니다.
 * 실전계좌/모의계좌의 경우, 한 번의 호출에 최대 100건까지 확인 가능합니다.
 *
 * @see https://openapi.koreainvestment.com:9443/uapi/overseas-price/v1/quotations/dailyprice
 *
 * @param ctx KIS Context
 * @param request 요청 정보 (거래소코드, 종목코드, 기간분류 등)
 * @returns 기간별 시세 정보
 */
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
