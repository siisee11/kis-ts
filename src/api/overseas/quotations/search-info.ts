import { type KisOverseasContext, overseasGet, toArray } from "../helpers";

export type SearchOverseasStockRequest = {
  /** 상품유형코드: 512=미국 나스닥, 513=미국 뉴욕, 529=미국 아멕스, 515=일본, 501=홍콩, 543=홍콩CNY, 558=홍콩USD, 507=베트남 하노이, 508=베트남 호치민, 551=중국 상해A, 552=중국 심천A */
  prdtTypeCd: string;
  /** 상품번호 (예: AAPL) */
  pdno: string;
};

export type SearchOverseasStockItem = {
  pdno?: string;
  prdt_eng_name?: string;
  natn_cd?: string;
  natn_name?: string;
  tr_mket_cd?: string;
  tr_mket_name?: string;
  ovrs_excg_cd?: string;
  ovrs_excg_name?: string;
  curr_cd?: string;
  papr?: string;
  lstn_stcn?: string;
  tr_stop_yn?: string;
  admn_item_yn?: string;
};

export type SearchOverseasStockResponse = {
  stocks: SearchOverseasStockItem[];
};

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
