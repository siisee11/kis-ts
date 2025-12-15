import { type KisOverseasContext, overseasGet, toArray } from "../helpers";

export type SearchOverseasStockRequest = {
  /**
   * 상품유형코드
   * 
   * 512: 미국 나스닥
   * 513: 미국 뉴욕
   * 529: 미국 아멕스
   * 515: 일본
   * 501: 홍콩
   * 543: 홍콩CNY
   * 558: 홍콩USD
   * 507: 베트남 하노이
   * 508: 베트남 호치민
   * 551: 중국 상해A
   * 552: 중국 심천A
   */
  prdtTypeCd: string;
  /** 상품번호 (예: AAPL) */
  pdno: string;
};

export type SearchOverseasStockItem = {
  /** 상품번호 */
  pdno?: string;
  /** 상품영문명 */
  prdt_eng_name?: string;
  /** 국가코드 */
  natn_cd?: string;
  /** 국가명 */
  natn_name?: string;
  /** 거래시장코드 */
  tr_mket_cd?: string;
  /** 거래시장명 */
  tr_mket_name?: string;
  /** 해외거래소코드 */
  ovrs_excg_cd?: string;
  /** 해외거래소명 */
  ovrs_excg_name?: string;
  /** 통화코드 */
  curr_cd?: string;
  /** 액면가 */
  papr?: string;
  /** 상장주수 */
  lstn_stcn?: string;
  /** 거래정지여부 */
  tr_stop_yn?: string;
  /** 관리종목여부 */
  admn_item_yn?: string;
};

export type SearchOverseasStockResponse = {
  /** 주식 정보 리스트 */
  stocks: SearchOverseasStockItem[];
};

/**
 * 해외주식 상품기본정보[v1_해외주식-034]
 * 
 * 해외주식 상품기본정보 API입니다.
 * 시세제공기관(연합)에서 제공하는 해외주식 상품기본정보 데이터를 확인하실 수 있습니다.
 * 
 * ※ 해당자료는 시세제공기관(연합)의 자료를 제공하고 있으며, 오류와 지연이 발생할 수 있습니다.
 * ※ 위 정보에 의한 투자판단의 최종책임은 정보이용자에게 있으며, 당사와 시세제공기관(연합)는 어떠한 법적인 책임도 지지 않사오니 투자에 참고로만 이용하시기 바랍니다.
 * 
 * @see https://apiportal.koreainvestment.com/apiservice-apiservice?/uapi/overseas-price/v1/quotations/search-info
 * 
 * @param ctx KIS Context
 * @param request 요청 정보 (상품유형코드, 상품번호)
 * @returns 해외주식 상품기본정보
 */
export const searchOverseasStock = async (
  ctx: KisOverseasContext,
  request: SearchOverseasStockRequest,
): Promise<SearchOverseasStockResponse> => {
  const trId = "CTPF1702R";

  const response = await overseasGet<Record<string, unknown>>(ctx, {
    path: "/uapi/overseas-price/v1/quotations/search-info",
    trId,
    params: {
      PRDT_TYPE_CD: request.prdtTypeCd,
      PDNO: request.pdno,
    },
    errorMessage: "Failed to search overseas stock.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  const stocks = toArray<SearchOverseasStockItem>(body.output);
  return { stocks };
};
