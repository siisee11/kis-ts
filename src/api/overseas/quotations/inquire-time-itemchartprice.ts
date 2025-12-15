import { type KisOverseasContext, overseasGet, toArray } from "../helpers";

export type InquireOverseasTimeItemChartPriceRequest = {
  /**
   * 사용자권한정보
   * "" 공백으로 입력
   */
  auth?: string;
  /**
   * 거래소코드
   * NYS : 뉴욕
   * NAS : 나스닥
   * AMS : 아멕스
   * HKS : 홍콩
   * SHS : 상해
   * SZS : 심천
   * HSX : 호치민
   * HNX : 하노이
   * TSE : 도쿄
   *
   * ※ 주간거래는 최대 1일치 분봉만 조회 가능
   * BAY : 뉴욕(주간)
   * BAQ : 나스닥(주간)
   * BAA : 아멕스(주간)
   */
  excd: string;
  /**
   * 종목코드
   * (ex. TSLA)
   */
  symb: string;
  /**
   * 분갭
   * 분단위(1: 1분봉, 2: 2분봉, ...)
   */
  nmin: string;
  /**
   * 전일포함여부
   * 0:당일 1:전일포함
   * ※ 다음조회 시 반드시 "1"로 입력
   */
  pinc: "0" | "1";
  /**
   * 다음여부
   * 처음조회 시, "" 공백 입력
   * 다음조회 시, "1" 입력
   */
  next?: string;
  /**
   * 요청갯수
   * 레코드요청갯수 (최대 120)
   */
  nrec: string;
  /**
   * 미체결채움구분
   * "" 공백으로 입력
   */
  fill?: string;
  /**
   * NEXT KEY BUFF
   * 처음 조회 시, "" 공백 입력
   * 다음 조회 시, 이전 조회 결과의 마지막 분봉 데이터를 이용하여, 1분 전 혹은 n분 전의 시간을 입력
   * (형식: YYYYMMDDHHMMSS, ex. 20241014140100)
   */
  keyb?: string;
};

export type OverseasTimeItemChartPriceOutput = {
  /** 실시간종목코드 */
  rsym?: string;
  /** 소수점자리수 */
  zdiv?: string;
  /** 장시작현지시간 */
  stim?: string;
  /** 장종료현지시간 */
  etim?: string;
  /** 장시작한국시간 */
  sktm?: string;
  /** 장종료한국시간 */
  ektm?: string;
  /** 다음가능여부 */
  next?: string;
  /** 추가데이타여부 */
  more?: string;
  /** 레코드갯수 */
  nrec?: string;
};

export type OverseasTimeItemChartPriceItem = {
  /** 현지영업일자 */
  tymd?: string;
  /** 현지기준일자 */
  xymd?: string;
  /** 현지기준시간 */
  xhms?: string;
  /** 한국기준일자 */
  kymd?: string;
  /** 한국기준시간 */
  khms?: string;
  /** 시가 */
  open?: string;
  /** 고가 */
  high?: string;
  /** 저가 */
  low?: string;
  /** 종가 */
  last?: string;
  /** 체결량 */
  evol?: string;
  /** 체결대금 */
  eamt?: string;
};

export type InquireOverseasTimeItemChartPriceResponse = {
  /** 응답상세1 (종목정보) */
  meta: OverseasTimeItemChartPriceOutput;
  /** 응답상세2 (분봉시세) */
  prices: OverseasTimeItemChartPriceItem[];
};

/**
 * 해외주식분봉조회[v1_해외주식-030]
 *
 * 해외주식분봉조회 API입니다. 실전계좌의 경우, 한 번의 호출에 최근 120건까지 확인 가능합니다.
 * NEXT 및 KEYB 값을 사용하여 데이터를 계속해서 다음 조회할 수 있으며, 최대 다음조회 가능 기간은 약 1개월입니다.
 *
 * @see https://apiportal.koreainvestment.com/apiservice-apiservice?/uapi/overseas-price/v1/quotations/inquire-time-itemchartprice
 *
 * @param ctx KIS Context
 * @param request 요청 정보
 * @returns 분봉 시세 정보
 */
export const inquireOverseasTimeItemChartPrice = async (
  ctx: KisOverseasContext,
  request: InquireOverseasTimeItemChartPriceRequest,
): Promise<InquireOverseasTimeItemChartPriceResponse> => {
  const trId = "HHDFS76950200";

  const response = await overseasGet<Record<string, unknown>>(ctx, {
    path: "/uapi/overseas-price/v1/quotations/inquire-time-itemchartprice",
    trId,
    params: {
      AUTH: request.auth ?? "",
      EXCD: request.excd,
      SYMB: request.symb,
      NMIN: request.nmin,
      PINC: request.pinc,
      NEXT: request.next ?? "",
      NREC: request.nrec,
      FILL: request.fill ?? "",
      KEYB: request.keyb ?? "",
    },
    errorMessage: "Failed to inquire overseas time item chart price.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  const [meta] = toArray<OverseasTimeItemChartPriceOutput>(body.output1);
  const prices = toArray<OverseasTimeItemChartPriceItem>(body.output2);

  return { meta: meta ?? {}, prices };
};
