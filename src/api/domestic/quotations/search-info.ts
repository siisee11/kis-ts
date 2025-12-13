import { domesticGet, type KisDomesticContext, toArray } from "../helpers";

// ==============================================================================================
// [국내주식] 종목정보 > 상품기본조회[v1_국내주식-029]
// ==============================================================================================

export type SearchInfoRequest = {
  /** 상품번호 (예: '000660', 'KR4101SC0009', 'AAPL') */
  pdno: string;
  /** 상품유형코드 (예: '300', '301', '512') */
  prdtTypeCd: string;
};

export type SearchInfoItem = {
  pdno?: string;
  prdt_type_cd?: string;
  prdt_name?: string;
  prdt_name120?: string;
  prdt_abrv_name?: string;
  prdt_eng_name?: string;
  prdt_eng_name120?: string;
  prdt_eng_abrv_name?: string;
  std_pdno?: string;
  shtn_pdno?: string;
  prdt_sale_stat_cd?: string;
  prdt_risk_grad_cd?: string;
  prdt_clsf_cd?: string;
  prdt_clsf_name?: string;
  sale_strt_dt?: string;
  sale_end_dt?: string;
  wrap_asst_type_cd?: string;
  ivst_prdt_type_cd?: string;
  ivst_prdt_type_cd_name?: string;
  frst_erlm_dt?: string;
};

export type SearchInfoResponse = {
  items: SearchInfoItem[];
};

export const searchInfo = async (
  ctx: KisDomesticContext,
  request: SearchInfoRequest,
): Promise<SearchInfoResponse> => {
  const trId = "CTPF1604R";

  const response = await domesticGet<Record<string, unknown>>(ctx, {
    path: "/uapi/domestic-stock/v1/quotations/search-info",
    trId,
    params: {
      PDNO: request.pdno,
      PRDT_TYPE_CD: request.prdtTypeCd,
    },
    errorMessage: "Failed to search domestic stock info.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  const items = toArray<SearchInfoItem>(body.output);
  return { items };
};
