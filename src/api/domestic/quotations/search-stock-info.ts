import { domesticGet, type KisDomesticContext, toArray } from "../helpers";

// ==============================================================================================
// [국내주식] 종목정보 > 주식기본조회[v1_국내주식-067]
// ==============================================================================================

export type SearchStockInfoRequest = {
  /** 상품유형코드: 300=주식/ETF/ETN/ELW, 301=선물옵션, 302=채권, 306=ELS */
  prdtTypeCd: string;
  /** 종목번호 (6자리), ETN의 경우 Q로 시작 (예: Q500001) */
  pdno: string;
};

export type SearchStockInfoItem = {
  pdno?: string;
  prdt_type_cd?: string;
  mket_id_cd?: string;
  scty_grp_id_cd?: string;
  excg_dvsn_cd?: string;
  setl_mmdd?: string;
  lstg_stqt?: string;
  lstg_cptl_amt?: string;
  cpta?: string;
  papr?: string;
  issu_pric?: string;
  kospi200_item_yn?: string;
  scts_mket_lstg_dt?: string;
  scts_mket_lstg_abol_dt?: string;
  kosdaq_mket_lstg_dt?: string;
  kosdaq_mket_lstg_abol_dt?: string;
  frbd_mket_lstg_dt?: string;
  frbd_mket_lstg_abol_dt?: string;
  reits_kind_cd?: string;
  etf_dvsn_cd?: string;
  oilf_fund_yn?: string;
  idx_bztp_lcls_cd?: string;
  idx_bztp_mcls_cd?: string;
  idx_bztp_scls_cd?: string;
  stck_kind_cd?: string;
  mfnd_opng_dt?: string;
  mfnd_end_dt?: string;
  dpsi_erlm_cncl_dt?: string;
  etf_cu_qty?: string;
  prdt_name?: string;
  prdt_name120?: string;
  prdt_abrv_name?: string;
  prdt_eng_name?: string;
  prdt_eng_name120?: string;
  prdt_eng_abrv_name?: string;
  dpsi_aptm_erlm_yn?: string;
  etf_txtn_type_cd?: string;
  etf_type_cd?: string;
  lstg_abol_dt?: string;
  nwst_odst_dvsn_cd?: string;
  sbst_pric?: string;
  thco_sbst_pric?: string;
  thco_sbst_pric_chng_dt?: string;
  tr_stop_yn?: string;
  admn_item_yn?: string;
  thdt_clpr?: string;
  bfdy_clpr?: string;
  clpr_chng_dt?: string;
  std_idst_clsf_cd?: string;
  std_idst_clsf_cd_name?: string;
  idx_bztp_lcls_cd_name?: string;
  idx_bztp_mcls_cd_name?: string;
  idx_bztp_scls_cd_name?: string;
  ocr_no?: string;
  crfd_item_yn?: string;
  elec_scty_yn?: string;
  issu_istt_cd?: string;
  etf_chas_erng_rt_dbnb?: string;
  etf_etn_ivst_heed_item_yn?: string;
  stln_int_rt_dvsn_cd?: string;
  frnr_psnl_lmt_rt?: string;
  lstg_rqsr_issu_istt_cd?: string;
  lstg_rqsr_item_cd?: string;
  trst_istt_issu_istt_cd?: string;
};

export type SearchStockInfoResponse = {
  items: SearchStockInfoItem[];
};

export const searchStockInfo = async (
  ctx: KisDomesticContext,
  request: SearchStockInfoRequest,
): Promise<SearchStockInfoResponse> => {
  const trId = "CTPF1002R";

  const response = await domesticGet<Record<string, unknown>>(ctx, {
    path: "/uapi/domestic-stock/v1/quotations/search-stock-info",
    trId,
    params: {
      PRDT_TYPE_CD: request.prdtTypeCd,
      PDNO: request.pdno,
    },
    errorMessage: "Failed to search domestic stock info.",
  });

  const body = (response.data ?? {}) as Record<string, unknown>;
  const items = toArray<SearchStockInfoItem>(body.output);
  return { items };
};
