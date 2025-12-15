import { KisError } from "../../../errors";
import type { KisEnvironment } from "../../../types";
import type { KisOverseasContext } from "../helpers";
import { overseasPost, toArray } from "../helpers";

export type PlaceOverseasOrderRequest = {
  /** 종합계좌번호 (8자리) */
  cano: string;
  /** 계좌상품코드 (2자리) */
  acntPrdtCd: string;
  /**
   * 해외거래소코드
   * 
   * NASD: 나스닥
   * NYSE: 뉴욕
   * AMEX: 아멕스
   * SEHK: 홍콩
   * SHAA: 상해A
   * SZAA: 심천A
   * TKSE: 도쿄
   * HASE: 하노이
   * VNSE: 호치민
   */
  ovrsExcgCd:
  | "NASD"
  | "NYSE"
  | "AMEX"
  | "SEHK"
  | "SHAA"
  | "SZAA"
  | "TKSE"
  | "HASE"
  | "VNSE";
  /** 상품번호 (종목코드) */
  pdno: string;
  /** 주문수량 */
  ordQty: string;
  /** 해외주문단가 */
  ovrsOrdUnpr: string;
  /** 주문구분 (buy: 매수, sell: 매도) */
  ordDv: "buy" | "sell";
  /** 연락전화번호 */
  ctacTlno?: string;
  /** 운용사지정주문번호 */
  mgcoAptmOdno?: string;
  /** 주문서버구분코드 */
  ordSvrDvsnCd?: string;
  /**
   * 주문구분
   * 
   * 00: 지정가
   * LOO: 장개시지정가
   * LOC: 장마감지정가
   * MOO: 장개시시장가
   * MOC: 장마감시장가
   */
  ordDvsn: string;
  /** 환경 (real: 실전, demo: 모의투자) */
  env?: KisEnvironment;
  /** 해시키 (보안키) */
  hashKey?: string;
};

export type PlaceOverseasOrderResponse = Record<string, unknown>[];

const resolveOverseasOrderTrId = (
  ovrsExcgCd: PlaceOverseasOrderRequest["ovrsExcgCd"],
  ordDv: PlaceOverseasOrderRequest["ordDv"],
): string => {
  if (ordDv === "buy") {
    if (ovrsExcgCd === "NASD" || ovrsExcgCd === "NYSE" || ovrsExcgCd === "AMEX")
      return "TTTT1002U";
    if (ovrsExcgCd === "SEHK") return "TTTS1002U";
    if (ovrsExcgCd === "SHAA") return "TTTS0202U";
    if (ovrsExcgCd === "SZAA") return "TTTS0305U";
    if (ovrsExcgCd === "TKSE") return "TTTS0308U";
    if (ovrsExcgCd === "HASE" || ovrsExcgCd === "VNSE") return "TTTS0311U";
  } else if (ordDv === "sell") {
    if (ovrsExcgCd === "NASD" || ovrsExcgCd === "NYSE" || ovrsExcgCd === "AMEX")
      return "TTTT1006U";
    if (ovrsExcgCd === "SEHK") return "TTTS1001U";
    if (ovrsExcgCd === "SHAA") return "TTTS1005U";
    if (ovrsExcgCd === "SZAA") return "TTTS0304U";
    if (ovrsExcgCd === "TKSE") return "TTTS0307U";
    if (ovrsExcgCd === "HASE" || ovrsExcgCd === "VNSE") return "TTTS0310U";
  }
  throw new KisError(
    "Unsupported combination of ordDv and ovrsExcgCd for overseas order.",
  );
};

/**
 * 해외주식 주문[v1_해외주식-001]
 * 
 * 해외주식 주문 API입니다.
 * 
 * * 모의투자의 경우, 모든 해외 종목 매매가 지원되지 않습니다. 일부 종목만 매매 가능한 점 유의 부탁드립니다.
 * * 해외주식 서비스 신청 후 이용 가능합니다.
 * * 해외 거래소 운영시간 외 API 호출 시 에러가 발생하오니 운영시간을 확인해주세요.
 * 
 * @see https://apiportal.koreainvestment.com/apiservice-apiservice?/uapi/overseas-stock/v1/trading/order
 * 
 * @param ctx KIS Context
 * @param request 주문 요청 정보
 * @returns 주문 결과
 */
export const placeOverseasOrder = async (
  ctx: KisOverseasContext,
  request: PlaceOverseasOrderRequest,
): Promise<PlaceOverseasOrderResponse> => {
  const env = request.env ?? "real";
  const baseTrId = resolveOverseasOrderTrId(request.ovrsExcgCd, request.ordDv);
  const trId = env === "demo" ? `V${baseTrId.slice(1)}` : baseTrId;
  const sllType = request.ordDv === "sell" ? "00" : "";

  const response = await overseasPost<Record<string, unknown>>(ctx, {
    path: "/uapi/overseas-stock/v1/trading/order",
    trId,
    data: {
      CANO: request.cano,
      ACNT_PRDT_CD: request.acntPrdtCd,
      OVRS_EXCG_CD: request.ovrsExcgCd,
      PDNO: request.pdno,
      ORD_QTY: request.ordQty,
      OVRS_ORD_UNPR: request.ovrsOrdUnpr,
      CTAC_TLNO: request.ctacTlno ?? "",
      MGCO_APTM_ODNO: request.mgcoAptmOdno ?? "",
      SLL_TYPE: sllType,
      ORD_SVR_DVSN_CD: request.ordSvrDvsnCd ?? "0",
      ORD_DVSN: request.ordDvsn,
    },
    hashKey: request.hashKey,
    errorMessage: "Failed to place overseas order.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  return toArray<Record<string, unknown>>(body.output);
};
