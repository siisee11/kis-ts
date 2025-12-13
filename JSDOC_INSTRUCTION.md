## How to make JSDOC

The official documentation of each API is available at https://apiportal.koreainvestment.com/apiservice-apiservice?/[apiUrl] 
(for example. https://apiportal.koreainvestment.com/apiservice-apiservice?/oauth2/tokenP)

You can find api url on [implementation status](IMPLEMENTATION_STATUS.md).


Visit and read the official documentation and make JSDOC.

Copy title and description from the official documentation and paste it into the JSDOC.

Add JSDOC to request param and response.

### Example

```
import { type KisOverseasContext, overseasGet, toArray } from "../helpers";


export type FetchOverseasPriceRequest = {
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
  /** 사용자권한정보 (Null 값 설정) */
  auth?: string;
};

export type OverseasPriceOutput = {
  /** 실시간조회종목코드 (D+시장구분(3자리)+종목코드) 예) DNASAAPL */
  rsym?: string;
  /** 소수점자리수 */
  zdiv?: string;
  /** 전일종가 */
  base?: string;
  /** 전일거래량 */
  pvol?: string;
  /** 현재가 (당일 조회시점의 현재 가격) */
  last?: string;
  /** 대비기호 (1:상한, 2:상승, 3:보합, 4:하한, 5:하락) */
  sign?: string;
  /** 대비 (전일 종가와 당일 현재가의 차이) */
  diff?: string;
  /** 등락율 (전일 대비 / 당일 현재가 * 100) */
  rate?: string;
  /** 거래량 (당일 조회시점까지 전체 거래량) */
  tvol?: string;
  /** 거래대금 (당일 조회시점까지 전체 거래금액) */
  tamt?: string;
  /** 매수가능여부 */
  ordy?: string;
};

export type FetchOverseasPriceResponse = {
  /** 성공 실패 여부 */
  rt_cd: string;
  /** 응답코드 */
  msg_cd: string;
  /** 응답메세지 */
  msg1: string;
  /** 응답상세 */
  output: OverseasPriceOutput;
};

type OverseasPriceApiResponseBody = {
  rt_cd: string;
  msg_cd: string;
  msg1: string;
  output: OverseasPriceOutput | OverseasPriceOutput[];
};

/**
 * 해외주식 현재체결가 [v1_해외주식-009]
 *
 * 해외주식종목의 현재체결가를 확인하는 API 입니다.
 * 해외주식 시세는 무료시세(지연체결가)만이 제공되며, API로는 유료시세(실시간체결가)를 받아보실 수 없습니다.
 *
 * @see https://openapi.koreainvestment.com:9443/uapi/overseas-price/v1/quotations/price
 * 
 * @param ctx KIS Context
 * @param request 요청 정보 (거래소코드, 종목코드)
 * @returns 현재가 정보
 */
export const fetchOverseasPrice = async (
  ctx: KisOverseasContext,
  request: FetchOverseasPriceRequest,
): Promise<FetchOverseasPriceResponse> => {
  const trId = "HHDFS00000300";

  const response = await overseasGet<OverseasPriceApiResponseBody>(ctx, {
    path: "/uapi/overseas-price/v1/quotations/price",
    trId,
    params: {
      AUTH: request.auth ?? "",
      EXCD: request.excd,
      SYMB: request.symb,
    },
    errorMessage: "Failed to fetch overseas stock price.",
  });

  const body = response.data;
  const [output] = toArray<OverseasPriceOutput>(body.output);

  return {
    rt_cd: body.rt_cd ?? "",
    msg_cd: body.msg_cd ?? "",
    msg1: body.msg1 ?? "",
    output: output ?? {},
  };
};
```