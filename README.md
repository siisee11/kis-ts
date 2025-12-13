## KIS API Implementation Status

This table tracks the implementation status of the KIS API endpoints.

| Type | API Name | Method | URL | Status |
|---|---|---|---|---|
| REST | Hashkey | POST | /uapi/hashkey | Not Implemented |
| WEBSOCKET | 실시간 (웹소켓) 접속키 발급 | POST | /oauth2/Approval | Implemented |
| REST | 접근토큰폐기(P) | POST | /oauth2/revokeP | Not Implemented |
| REST | 접근토큰발급(P) | POST | /oauth2/tokenP | Implemented |
| REST | 기간별계좌권리현황조회 | GET | /uapi/domestic-stock/v1/trading/period-rights | Not Implemented |
| REST | 투자계좌자산현황조회 | GET | /uapi/domestic-stock/v1/trading/inquire-account-balance | Not Implemented |
| REST | 퇴직연금 예수금조회 | GET | /uapi/domestic-stock/v1/trading/pension/inquire-deposit | Not Implemented |
| REST | 주식예약주문정정취소 | POST | /uapi/domestic-stock/v1/trading/order-resv-rvsecncl | Not Implemented |
| REST | 신용매수가능조회 | GET | /uapi/domestic-stock/v1/trading/inquire-credit-psamount | Not Implemented |
| REST | 주식통합증거금 현황 | GET | /uapi/domestic-stock/v1/trading/intgr-margin | Not Implemented |
| REST | 퇴직연금 미체결내역 | GET | /uapi/domestic-stock/v1/trading/pension/inquire-daily-ccld | Not Implemented |
| REST | 기간별매매손익현황조회 | GET | /uapi/domestic-stock/v1/trading/inquire-period-trade-profit | Not Implemented |
| REST | 주식주문(정정취소) | POST | /uapi/domestic-stock/v1/trading/order-rvsecncl | Not Implemented |
| REST | 주식예약주문조회 | GET | /uapi/domestic-stock/v1/trading/order-resv-ccnl | Not Implemented |
| REST | 퇴직연금 매수가능조회 | GET | /uapi/domestic-stock/v1/trading/pension/inquire-psbl-order | Not Implemented |
| REST | 주식잔고조회 | GET | /uapi/domestic-stock/v1/trading/inquire-balance | Not Implemented |
| REST | 퇴직연금 체결기준잔고 | GET | /uapi/domestic-stock/v1/trading/pension/inquire-present-balance | Not Implemented |
| REST | 매수가능조회 | GET | /uapi/domestic-stock/v1/trading/inquire-psbl-order | Implemented |
| REST | 기간별손익일별합산조회 | GET | /uapi/domestic-stock/v1/trading/inquire-period-profit | Not Implemented |
| REST | 주식주문(현금) | POST | /uapi/domestic-stock/v1/trading/order-cash | Implemented |
| REST | 매도가능수량조회 | GET | /uapi/domestic-stock/v1/trading/inquire-psbl-sell | Not Implemented |
| REST | 주식일별주문체결조회 | GET | /uapi/domestic-stock/v1/trading/inquire-daily-ccld | Not Implemented |
| REST | 주식정정취소가능주문조회 | GET | /uapi/domestic-stock/v1/trading/inquire-psbl-rvsecncl | Not Implemented |
| REST | 주식예약주문 | POST | /uapi/domestic-stock/v1/trading/order-resv | Not Implemented |
| REST | 주식주문(신용) | POST | /uapi/domestic-stock/v1/trading/order-credit | Not Implemented |
| REST | 퇴직연금 잔고조회 | GET | /uapi/domestic-stock/v1/trading/pension/inquire-balance | Not Implemented |
| REST | 주식잔고조회_실현손익 | GET | /uapi/domestic-stock/v1/trading/inquire-balance-rlz-pl | Not Implemented |
| REST | 주식현재가 일자별 | GET | /uapi/domestic-stock/v1/quotations/inquire-daily-price | Not Implemented |
| REST | 주식현재가 시세 | GET | /uapi/domestic-stock/v1/quotations/inquire-price | Not Implemented |
| REST | 국내주식 시간외현재가 | GET | /uapi/domestic-stock/v1/quotations/inquire-overtime-price | Not Implemented |
| REST | ETF 구성종목시세 | GET | /uapi/etfetn/v1/quotations/inquire-component-stock-price | Not Implemented |
| REST | 주식현재가 시간외시간별체결 | GET | /uapi/domestic-stock/v1/quotations/inquire-time-overtimeconclusion | Not Implemented |
| REST | NAV 비교추이(종목) | GET | /uapi/etfetn/v1/quotations/nav-comparison-trend | Not Implemented |
| REST | 주식현재가 시간외일자별주가 | GET | /uapi/domestic-stock/v1/quotations/inquire-daily-overtimeprice | Not Implemented |
| REST | 국내주식 시간외호가 | GET | /uapi/domestic-stock/v1/quotations/inquire-overtime-asking-price | Not Implemented |
| REST | 주식현재가 당일시간대별체결 | GET | /uapi/domestic-stock/v1/quotations/inquire-time-itemconclusion | Not Implemented |
| REST | 주식현재가 시세2 | GET | /uapi/domestic-stock/v1/quotations/inquire-price-2 | Not Implemented |
| REST | 주식일별분봉조회 | GET | /uapi/domestic-stock/v1/quotations/inquire-time-dailychartprice | Not Implemented |
| REST | 국내주식기간별시세(일/주/월/년) | GET | /uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice | Not Implemented |
| REST | NAV 비교추이(일) | GET | /uapi/etfetn/v1/quotations/nav-comparison-daily-trend | Not Implemented |
| REST | 주식현재가 호가/예상체결 | GET | /uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn | Not Implemented |
| REST | 주식현재가 체결 | GET | /uapi/domestic-stock/v1/quotations/inquire-ccnl | Not Implemented |
| REST | 주식현재가 회원사 | GET | /uapi/domestic-stock/v1/quotations/inquire-member | Not Implemented |
| REST | NAV 비교추이(분) | GET | /uapi/etfetn/v1/quotations/nav-comparison-time-trend | Not Implemented |
| REST | 주식현재가 투자자 | GET | /uapi/domestic-stock/v1/quotations/inquire-investor | Not Implemented |
| REST | ETF/ETN 현재가 | GET | /uapi/etfetn/v1/quotations/inquire-price | Not Implemented |
| REST | 국내주식 장마감 예상체결가 | GET | /uapi/domestic-stock/v1/quotations/exp-closing-price | Not Implemented |
| REST | 주식당일분봉조회 | GET | /uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice | Not Implemented |
| REST | ELW 현재가 시세 | GET | /uapi/domestic-stock/v1/quotations/inquire-elw-price | Not Implemented |
| REST | ELW 신규상장종목 | GET | /uapi/elw/v1/quotations/newly-listed | Not Implemented |
| REST | ELW 투자지표추이(일별) | GET | /uapi/elw/v1/quotations/indicator-trend-daily | Not Implemented |
| REST | ELW 민감도 순위 | GET | /uapi/elw/v1/ranking/sensitivity | Not Implemented |
| REST | ELW 기초자산별 종목시세 | GET | /uapi/elw/v1/quotations/udrl-asset-price | Not Implemented |
| REST | ELW 종목검색 | GET | /uapi/elw/v1/quotations/cond-search | Not Implemented |
| REST | ELW 변동성 추이(분별) | GET | /uapi/elw/v1/quotations/volatility-trend-minute | Not Implemented |
| REST | ELW 변동성추이(체결) | GET | /uapi/elw/v1/quotations/volatility-trend-ccnl | Not Implemented |
| REST | ELW 당일급변종목 | GET | /uapi/elw/v1/ranking/quick-change | Not Implemented |
| REST | ELW 투자지표추이(분별) | GET | /uapi/elw/v1/quotations/indicator-trend-minute | Not Implemented |
| REST | ELW 기초자산 목록조회 | GET | /uapi/elw/v1/quotations/udrl-asset-list | Not Implemented |
| REST | ELW 변동성 추이(일별) | GET | /uapi/elw/v1/quotations/volatility-trend-daily | Not Implemented |
| REST | ELW 거래량순위 | GET | /uapi/elw/v1/ranking/volume-rank | Not Implemented |
| REST | ELW 지표순위 | GET | /uapi/elw/v1/ranking/indicator | Not Implemented |
| REST | ELW 투자지표추이(체결) | GET | /uapi/elw/v1/quotations/indicator-trend-ccnl | Not Implemented |
| REST | ELW 상승률순위 | GET | /uapi/elw/v1/ranking/updown-rate | Not Implemented |
| REST | ELW 민감도 추이(일별) | GET | /uapi/elw/v1/quotations/sensitivity-trend-daily | Not Implemented |
| REST | ELW 비교대상종목조회 | GET | /uapi/elw/v1/quotations/compare-stocks | Not Implemented |
| REST | ELW 만기예정/만기종목 | GET | /uapi/elw/v1/quotations/expiration-stocks | Not Implemented |
| REST | ELW LP매매추이 | GET | /uapi/elw/v1/quotations/lp-trade-trend | Not Implemented |
| REST | ELW 민감도 추이(체결) | GET | /uapi/elw/v1/quotations/sensitivity-trend-ccnl | Not Implemented |
| REST | ELW 변동성 추이(틱) | GET | /uapi/elw/v1/quotations/volatility-trend-tick | Not Implemented |
| REST | 국내주식 예상체결지수 추이 | GET | /uapi/domestic-stock/v1/quotations/exp-index-trend | Not Implemented |
| REST | 국내주식업종기간별시세(일/주/월/년) | GET | /uapi/domestic-stock/v1/quotations/inquire-daily-indexchartprice | Not Implemented |
| REST | 국내업종 시간별지수(분) | GET | /uapi/domestic-stock/v1/quotations/inquire-index-timeprice | Not Implemented |
| REST | 국내업종 구분별전체시세 | GET | /uapi/domestic-stock/v1/quotations/inquire-index-category-price | Not Implemented |
| REST | 업종 분봉조회 | GET | /uapi/domestic-stock/v1/quotations/inquire-time-indexchartprice | Not Implemented |
| REST | 국내휴장일조회 | GET | /uapi/domestic-stock/v1/quotations/chk-holiday | Implemented |
| REST | 국내주식 예상체결 전체지수 | GET | /uapi/domestic-stock/v1/quotations/exp-total-index | Not Implemented |
| REST | 국내업종 현재지수 | GET | /uapi/domestic-stock/v1/quotations/inquire-index-price | Not Implemented |
| REST | 국내선물 영업일조회 | GET | /uapi/domestic-stock/v1/quotations/market-time | Not Implemented |
| REST | 국내업종 시간별지수(초) | GET | /uapi/domestic-stock/v1/quotations/inquire-index-tickprice | Not Implemented |
| REST | 국내업종 일자별지수 | GET | /uapi/domestic-stock/v1/quotations/inquire-index-daily-price | Not Implemented |
| REST | 금리 종합(국내채권/금리) | GET | /uapi/domestic-stock/v1/quotations/comp-interest | Not Implemented |
| REST | 변동성완화장치(VI) 현황 | GET | /uapi/domestic-stock/v1/quotations/inquire-vi-status | Not Implemented |
| REST | 종합 시황/공시(제목) | GET | /uapi/domestic-stock/v1/quotations/news-title | Not Implemented |
| REST | 상품기본조회 | GET | /uapi/domestic-stock/v1/quotations/search-info | Implemented |
| REST | 예탁원정보(상장정보일정) | GET | /uapi/domestic-stock/v1/ksdinfo/list-info | Not Implemented |
| REST | 예탁원정보(공모주청약일정) | GET | /uapi/domestic-stock/v1/ksdinfo/pub-offer | Not Implemented |
| REST | 국내주식 재무비율 | GET | /uapi/domestic-stock/v1/finance/financial-ratio | Not Implemented |
| REST | 예탁원정보(자본감소일정) | GET | /uapi/domestic-stock/v1/ksdinfo/cap-dcrs | Not Implemented |
| REST | 예탁원정보(무상증자일정) | GET | /uapi/domestic-stock/v1/ksdinfo/bonus-issue | Not Implemented |
| REST | 국내주식 증권사별 투자의견 | GET | /uapi/domestic-stock/v1/quotations/invest-opbysec | Not Implemented |
| REST | 국내주식 당사 신용가능종목 | GET | /uapi/domestic-stock/v1/quotations/credit-by-company | Not Implemented |
| REST | 예탁원정보(주식매수청구일정) | GET | /uapi/domestic-stock/v1/ksdinfo/purreq | Not Implemented |
| REST | 예탁원정보(액면교체일정) | GET | /uapi/domestic-stock/v1/ksdinfo/rev-split | Not Implemented |
| REST | 예탁원정보(배당일정) | GET | /uapi/domestic-stock/v1/ksdinfo/dividend | Not Implemented |
| REST | 국내주식 종목투자의견 | GET | /uapi/domestic-stock/v1/quotations/invest-opinion | Not Implemented |
| REST | 국내주식 안정성비율 | GET | /uapi/domestic-stock/v1/finance/stability-ratio | Not Implemented |
| REST | 국내주식 수익성비율 | GET | /uapi/domestic-stock/v1/finance/profit-ratio | Not Implemented |
| REST | 예탁원정보(실권주일정) | GET | /uapi/domestic-stock/v1/ksdinfo/forfeit | Not Implemented |
| REST | 예탁원정보(의무예치일정) | GET | /uapi/domestic-stock/v1/ksdinfo/mand-deposit | Not Implemented |
| REST | 국내주식 손익계산서 | GET | /uapi/domestic-stock/v1/finance/income-statement | Not Implemented |
| REST | 당사 대주가능 종목 | GET | /uapi/domestic-stock/v1/quotations/lendable-by-company | Not Implemented |
| REST | 주식기본조회 | GET | /uapi/domestic-stock/v1/quotations/search-stock-info | Implemented |
| REST | 예탁원정보(유상증자일정) | GET | /uapi/domestic-stock/v1/ksdinfo/paidin-capin | Not Implemented |
| REST | 예탁원정보(주주총회일정) | GET | /uapi/domestic-stock/v1/ksdinfo/sharehld-meet | Not Implemented |
| REST | 국내주식 성장성비율 | GET | /uapi/domestic-stock/v1/finance/growth-ratio | Not Implemented |
| REST | 국내주식 대차대조표 | GET | /uapi/domestic-stock/v1/finance/balance-sheet | Not Implemented |
| REST | 예탁원정보(합병/분할일정) | GET | /uapi/domestic-stock/v1/ksdinfo/merger-split | Not Implemented |
| REST | 국내주식 종목추정실적 | GET | /uapi/domestic-stock/v1/quotations/estimate-perform | Not Implemented |
| REST | 국내주식 기타주요비율 | GET | /uapi/domestic-stock/v1/finance/other-major-ratios | Not Implemented |
| REST | 프로그램매매 종합현황(시간) | GET | /uapi/domestic-stock/v1/quotations/comp-program-trade-today | Not Implemented |
| REST | 국내주식 신용잔고 일별추이 | GET | /uapi/domestic-stock/v1/quotations/daily-credit-balance | Implemented |
| REST | 시장별 투자자매매동향(일별) | GET | /uapi/domestic-stock/v1/quotations/inquire-investor-daily-by-market | Not Implemented |
| REST | 국내주식 공매도 일별추이 | GET | /uapi/domestic-stock/v1/quotations/daily-short-sale | Not Implemented |
| REST | 종목별 투자자매매동향(일별) | GET | /uapi/domestic-stock/v1/quotations/investor-trade-by-stock-daily | Not Implemented |
| REST | 종목조건검색 목록조회 | GET | /uapi/domestic-stock/v1/quotations/psearch-title | Not Implemented |
| REST | 국내주식 상하한가 포착 | GET | /uapi/domestic-stock/v1/quotations/capture-uplowprice | Implemented |
| REST | 프로그램매매 종합현황(일별) | GET | /uapi/domestic-stock/v1/quotations/comp-program-trade-daily | Not Implemented |
| REST | 종목별 일별 대차거래추이 | GET | /uapi/domestic-stock/v1/quotations/daily-loan-trans | Not Implemented |
| REST | 종목조건검색조회 | GET | /uapi/domestic-stock/v1/quotations/psearch-result | Not Implemented |
| REST | 국내주식 매물대/거래비중 | GET | /uapi/domestic-stock/v1/quotations/pbar-tratio | Not Implemented |
| REST | 국내기관_외국인 매매종목가집계 | GET | /uapi/domestic-stock/v1/quotations/foreign-institution-total | Not Implemented |
| REST | 관심종목 그룹별 종목조회 | GET | /uapi/domestic-stock/v1/quotations/intstock-stocklist-by-group | Not Implemented |
| REST | 주식현재가 회원사 종목매매동향 | GET | /uapi/domestic-stock/v1/quotations/inquire-member-daily | Not Implemented |
| REST | 종목별 프로그램매매추이(일별) | GET | /uapi/domestic-stock/v1/quotations/program-trade-by-stock-daily | Not Implemented |
| REST | 관심종목 그룹조회 | GET | /uapi/domestic-stock/v1/quotations/intstock-grouplist | Not Implemented |
| REST | 종목별 외인기관 추정가집계 | GET | /uapi/domestic-stock/v1/quotations/investor-trend-estimate | Not Implemented |
| REST | 종목별일별매수매도체결량 | GET | /uapi/domestic-stock/v1/quotations/inquire-daily-trade-volume | Not Implemented |
| REST | 국내주식 체결금액별 매매비중 | GET | /uapi/domestic-stock/v1/quotations/tradprt-byamt | Not Implemented |
| REST | 프로그램매매 투자자매매동향(당일) | GET | /uapi/domestic-stock/v1/quotations/investor-program-trade-today | Not Implemented |
| REST | 국내 증시자금 종합 | GET | /uapi/domestic-stock/v1/quotations/mktfunds | Not Implemented |
| REST | 국내주식 예상체결가 추이 | GET | /uapi/domestic-stock/v1/quotations/exp-price-trend | Not Implemented |
| WEBSOCKET | 회원사 실시간 매매동향(틱) | GET | /uapi/domestic-stock/v1/quotations/frgnmem-trade-trend | Not Implemented |
| REST | 시장별 투자자매매동향(시세) | GET | /uapi/domestic-stock/v1/quotations/inquire-investor-time-by-market | Not Implemented |
| REST | 종목별 프로그램매매추이(체결) | GET | /uapi/domestic-stock/v1/quotations/program-trade-by-stock | Not Implemented |
| REST | 외국계 매매종목 가집계 | GET | /uapi/domestic-stock/v1/quotations/frgnmem-trade-estimate | Not Implemented |
| REST | 국내주식 시간외예상체결등락률 | GET | /uapi/domestic-stock/v1/ranking/overtime-exp-trans-fluct | Not Implemented |
| REST | 종목별 외국계 순매수추이 | GET | /uapi/domestic-stock/v1/quotations/frgnmem-pchs-trend | Not Implemented |
| REST | 관심종목(멀티종목) 시세조회 | GET | /uapi/domestic-stock/v1/quotations/intstock-multprice | Not Implemented |
| REST | 국내주식 예상체결 상승/하락상위 | GET | /uapi/domestic-stock/v1/ranking/exp-trans-updown | Not Implemented |
| REST | 국내주식 호가잔량 순위 | GET | /uapi/domestic-stock/v1/ranking/quote-balance | Not Implemented |
| REST | 국내주식 신용잔고 상위 | GET | /uapi/domestic-stock/v1/ranking/credit-balance | Implemented |
| REST | 국내주식 시간외거래량순위 | GET | /uapi/domestic-stock/v1/ranking/overtime-volume | Not Implemented |
| REST | 국내주식 배당률 상위 | GET | /uapi/domestic-stock/v1/ranking/dividend-rate | Not Implemented |
| REST | 국내주식 시간외잔량 순위 | GET | /uapi/domestic-stock/v1/ranking/after-hour-balance | Implemented |
| REST | 국내주식 공매도 상위종목 | GET | /uapi/domestic-stock/v1/ranking/short-sale | Not Implemented |
| REST | 국내주식 이격도 순위 | GET | /uapi/domestic-stock/v1/ranking/disparity | Not Implemented |
| REST | HTS조회상위20종목 | GET | /uapi/domestic-stock/v1/ranking/hts-top-view | Not Implemented |
| REST | 거래량순위 | GET | /uapi/domestic-stock/v1/quotations/volume-rank | Not Implemented |
| REST | 국내주식 수익자산지표 순위 | GET | /uapi/domestic-stock/v1/ranking/profit-asset-index | Not Implemented |
| REST | 국내주식 신고/신저근접종목 상위 | GET | /uapi/domestic-stock/v1/ranking/near-new-highlow | Not Implemented |
| REST | 국내주식 우선주/괴리율 상위 | GET | /uapi/domestic-stock/v1/ranking/prefer-disparate-ratio | Not Implemented |
| REST | 국내주식 대량체결건수 상위 | GET | /uapi/domestic-stock/v1/ranking/bulk-trans-num | Implemented |
| REST | 국내주식 재무비율 순위 | GET | /uapi/domestic-stock/v1/ranking/finance-ratio | Not Implemented |
| REST | 국내주식 시가총액 상위 | GET | /uapi/domestic-stock/v1/ranking/market-cap | Not Implemented |
| REST | 국내주식 당사매매종목 상위 | GET | /uapi/domestic-stock/v1/ranking/traded-by-company | Not Implemented |
| REST | 국내주식 등락률 순위 | GET | /uapi/domestic-stock/v1/ranking/fluctuation | Not Implemented |
| REST | 국내주식 시장가치 순위 | GET | /uapi/domestic-stock/v1/ranking/market-value | Not Implemented |
| REST | 국내주식 관심종목등록 상위 | GET | /uapi/domestic-stock/v1/ranking/top-interest-stock | Not Implemented |
| REST | 국내주식 체결강도 상위 | GET | /uapi/domestic-stock/v1/ranking/volume-power | Not Implemented |
| REST | 국내주식 시간외등락율순위 | GET | /uapi/domestic-stock/v1/ranking/overtime-fluctuation | Not Implemented |
| WEBSOCKET | 국내지수 실시간예상체결 | POST | /tryitout/H0UPANC0 | Not Implemented |
| REST | 국내주식 장운영정보 (통합) | POST | /tryitout/H0UNMKO0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간회원사 (NXT) | POST | /tryitout/H0NXMBC0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간체결통보 | POST | /tryitout/H0STCNI0 | Not Implemented |
| WEBSOCKET | 국내주식 시간외 실시간예상체결 (KRX) | POST | /tryitout/H0STOAC0 | Not Implemented |
| WEBSOCKET | 국내주식 시간외 실시간호가 (KRX) | POST | /tryitout/H0STOAA0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간프로그램매매 (통합) | POST | /tryitout/H0UNPGM0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간호가 (통합) | POST | /tryitout/H0UNASP0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간프로그램매매 (KRX) | POST | /tryitout/H0STPGM0 | Not Implemented |
| WEBSOCKET | 국내주식 장운영정보 (KRX) | POST | /tryitout/H0STMKO0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간체결가 (KRX) | POST | /tryitout/H0STCNT0 | Not Implemented |
| WEBSOCKET | 국내지수 실시간프로그램매매 | POST | /tryitout/H0UPPGM0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간회원사 (통합) | POST | /tryitout/H0UNMBC0 | Not Implemented |
| WEBSOCKET | 국내지수 실시간체결 | POST | /tryitout/H0UPCNT0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간예상체결 (KRX) | POST | /tryitout/H0STANC0 | Not Implemented |
| WEBSOCKET | ELW 실시간호가 | POST | /tryitout/H0EWASP0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간호가 (KRX) | POST | /tryitout/H0STASP0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간체결가 (통합) | POST | /tryitout/H0UNCNT0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간호가 (NXT) | POST | /tryitout/H0NXASP0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간프로그램매매 (NXT) | POST | /tryitout/H0NXPGM0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간체결가 (NXT) | POST | /tryitout/H0NXCNT0 | Not Implemented |
| WEBSOCKET | ELW 실시간체결가 | POST | /tryitout/H0EWCNT0 | Not Implemented |
| WEBSOCKET | ELW 실시간예상체결 | POST | /tryitout/H0EWANC0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간예상체결 (NXT) | POST | /tryitout/H0NXANC0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간회원사 (KRX) | POST | /tryitout/H0STMBC0 | Not Implemented |
| WEBSOCKET | 국내주식 실시간예상체결 (통합) | POST | /tryitout/H0UNANC0 | Not Implemented |
| REST | 국내주식 장운영정보 (NXT) | POST | /tryitout/H0NXMKO0 | Not Implemented |
| WEBSOCKET | 국내ETF NAV추이 | POST | /tryitout/H0STNAV0 | Not Implemented |
| WEBSOCKET | 국내주식 시간외 실시간체결가 (KRX) | POST | /tryitout/H0STOUP0 | Not Implemented |
| REST | (야간)선물옵션 증거금 상세 | GET | /uapi/domestic-futureoption/v1/trading/ngt-margin-detail | Not Implemented |
| REST | 선물옵션 총자산현황 | GET | /uapi/domestic-futureoption/v1/trading/inquire-deposit | Not Implemented |
| REST | 선물옵션기간약정수수료일별 | GET | /uapi/domestic-futureoption/v1/trading/inquire-daily-amount-fee | Not Implemented |
| REST | (야간)선물옵션 잔고현황 | GET | /uapi/domestic-futureoption/v1/trading/inquire-ngt-balance | Not Implemented |
| REST | 선물옵션 잔고현황 | GET | /uapi/domestic-futureoption/v1/trading/inquire-balance | Not Implemented |
| REST | 선물옵션 주문 | POST | /uapi/domestic-futureoption/v1/trading/order | Not Implemented |
| REST | 선물옵션 잔고평가손익내역 | GET | /uapi/domestic-futureoption/v1/trading/inquire-balance-valuation-pl | Not Implemented |
| REST | 선물옵션 정정취소주문 | POST | /uapi/domestic-futureoption/v1/trading/order-rvsecncl | Not Implemented |
| REST | 선물옵션 주문체결내역조회 | GET | /uapi/domestic-futureoption/v1/trading/inquire-ccnl | Not Implemented |
| REST | (야간)선물옵션 주문체결 내역조회 | GET | /uapi/domestic-futureoption/v1/trading/inquire-ngt-ccnl | Not Implemented |
| REST | (야간)선물옵션 주문가능 조회 | GET | /uapi/domestic-futureoption/v1/trading/inquire-psbl-ngt-order | Not Implemented |
| REST | 선물옵션 잔고정산손익내역 | GET | /uapi/domestic-futureoption/v1/trading/inquire-balance-settlement-pl | Not Implemented |
| REST | 선물옵션 주문가능 | GET | /uapi/domestic-futureoption/v1/trading/inquire-psbl-order | Not Implemented |
| REST | 선물옵션 기준일체결내역 | GET | /uapi/domestic-futureoption/v1/trading/inquire-ccnl-bstime | Not Implemented |
| REST | 선물옵션 시세 | GET | /uapi/domestic-futureoption/v1/quotations/inquire-price | Not Implemented |
| REST | 국내선물 기초자산 시세 | GET | /uapi/domestic-futureoption/v1/quotations/display-board-top | Not Implemented |
| REST | 선물옵션 일중예상체결추이 | GET | /uapi/domestic-futureoption/v1/quotations/exp-price-trend | Not Implemented |
| REST | 선물옵션기간별시세(일/주/월/년) | GET | /uapi/domestic-futureoption/v1/quotations/inquire-daily-fuopchartprice | Not Implemented |
| REST | 국내옵션전광판_선물 | GET | /uapi/domestic-futureoption/v1/quotations/display-board-futures | Not Implemented |
| REST | 선물옵션 분봉조회 | GET | /uapi/domestic-futureoption/v1/quotations/inquire-time-fuopchartprice | Not Implemented |
| REST | 국내옵션전광판_옵션월물리스트 | GET | /uapi/domestic-futureoption/v1/quotations/display-board-option-list | Not Implemented |
| REST | 선물옵션 시세호가 | GET | /uapi/domestic-futureoption/v1/quotations/inquire-asking-price | Not Implemented |
| REST | 국내옵션전광판_콜풋 | GET | /uapi/domestic-futureoption/v1/quotations/display-board-callput | Not Implemented |
| WEBSOCKET | 주식옵션 실시간호가 | POST | /tryitout/H0ZOASP0 | Not Implemented |
| WEBSOCKET | 선물옵션 실시간체결통보 | POST | /tryitout/H0IFCNI0 | Not Implemented |
| WEBSOCKET | KRX야간선물 실시간종목체결 | POST | /tryitout/H0MFCNT0 | Not Implemented |
| WEBSOCKET | KRX야간선물 실시간호가 | POST | /tryitout/H0MFASP0 | Not Implemented |
| WEBSOCKET | KRX야간옵션 실시간체결가 | POST | /tryitout/H0EUCNT0 | Not Implemented |
| WEBSOCKET | KRX야간옵션실시간예상체결 | POST | /tryitout/H0EUANC0 | Not Implemented |
| WEBSOCKET | 지수선물 실시간체결가 | POST | /tryitout/H0IFCNT0 | Not Implemented |
| WEBSOCKET | 주식선물 실시간예상체결 | POST | /tryitout/H0ZFANC0 | Not Implemented |
| WEBSOCKET | KRX야간옵션실시간체결통보 | POST | /tryitout/H0EUCNI0 | Not Implemented |
| WEBSOCKET | KRX야간선물 실시간체결통보 | POST | /tryitout/H0MFCNI0 | Not Implemented |
| WEBSOCKET | 상품선물 실시간체결가 | POST | /tryitout/H0CFCNT0 | Not Implemented |
| WEBSOCKET | 지수선물 실시간호가 | POST | /tryitout/H0IFASP0 | Not Implemented |
| WEBSOCKET | 지수옵션  실시간체결가 | POST | /tryitout/H0IOCNT0 | Not Implemented |
| WEBSOCKET | KRX야간옵션 실시간호가 | POST | /tryitout/H0EUASP0 | Not Implemented |
| WEBSOCKET | 상품선물 실시간호가 | POST | /tryitout/H0CFASP0 | Not Implemented |
| WEBSOCKET | 주식옵션 실시간예상체결 | POST | /tryitout/H0ZOANC0 | Not Implemented |
| WEBSOCKET | 주식선물 실시간호가 | POST | /tryitout/H0ZFASP0 | Not Implemented |
| WEBSOCKET | 주식옵션 실시간체결가 | POST | /tryitout/H0ZOCNT0 | Not Implemented |
| WEBSOCKET | 지수옵션 실시간호가 | POST | /tryitout/H0IOASP0 | Not Implemented |
| WEBSOCKET | 주식선물 실시간체결가 | POST | /tryitout/H0ZFCNT0 | Not Implemented |
| REST | 해외주식 잔고 | GET | /uapi/overseas-stock/v1/trading/inquire-balance | Implemented |
| REST | 해외주식 체결기준현재잔고 | GET | /uapi/overseas-stock/v1/trading/inquire-present-balance | Implemented |
| REST | 해외주식 지정가체결내역조회 | GET | /uapi/overseas-stock/v1/trading/inquire-algo-ccnl | Not Implemented |
| REST | 해외주식 기간손익 | GET | /uapi/overseas-stock/v1/trading/inquire-period-profit | Implemented |
| REST | 해외주식 매수가능금액조회 | GET | /uapi/overseas-stock/v1/trading/inquire-psamount | Implemented |
| REST | 해외주식 정정취소주문 | POST | /uapi/overseas-stock/v1/trading/order-rvsecncl | Implemented |
| REST | 해외주식 예약주문접수 | POST | /uapi/overseas-stock/v1/trading/order-resv | Implemented |
| REST | 해외주식 미체결내역 | GET | /uapi/overseas-stock/v1/trading/inquire-nccs | Implemented |
| REST | 해외주식 미국주간정정취소 | POST | /uapi/overseas-stock/v1/trading/daytime-order-rvsecncl | Implemented |
| REST | 해외주식 주문체결내역 | GET | /uapi/overseas-stock/v1/trading/inquire-ccnl | Implemented |
| REST | 해외주식 결제기준잔고 | GET | /uapi/overseas-stock/v1/trading/inquire-paymt-stdr-balance | Implemented |
| REST | 해외주식 일별거래내역 | GET | /uapi/overseas-stock/v1/trading/inquire-period-trans | Implemented |
| REST | 해외주식 미국주간주문 | POST | /uapi/overseas-stock/v1/trading/daytime-order | Implemented |
| REST | 해외주식 예약주문조회 | GET | /uapi/overseas-stock/v1/trading/order-resv-list | Implemented |
| REST | 해외주식 주문 | POST | /uapi/overseas-stock/v1/trading/order | Implemented |
| REST | 해외주식 예약주문접수취소 | POST | /uapi/overseas-stock/v1/trading/order-resv-ccnl | Implemented |
| REST | 해외주식 지정가주문번호조회 | GET | /uapi/overseas-stock/v1/trading/algo-ordno | Not Implemented |
| REST | 해외증거금 통화별조회 | GET | /uapi/overseas-stock/v1/trading/foreign-margin | Not Implemented |
| REST | 해외주식 체결추이 | GET | /uapi/overseas-price/v1/quotations/inquire-ccnl | Not Implemented |
| REST | 해외주식 기간별시세 | GET | /uapi/overseas-price/v1/quotations/dailyprice | Implemented |
| REST | 해외결제일자조회 | GET | /uapi/overseas-stock/v1/quotations/countries-holiday | Not Implemented |
| REST | 해외주식 현재체결가 | GET | /uapi/overseas-price/v1/quotations/price | Implemented |
| REST | 해외주식조건검색 | GET | /uapi/overseas-price/v1/quotations/inquire-search | Not Implemented |
| REST | 해외주식 상품기본정보 | GET | /uapi/overseas-price/v1/quotations/search-info | Implemented |
| REST | 해외지수분봉조회 | GET | /uapi/overseas-price/v1/quotations/inquire-time-indexchartprice | Not Implemented |
| REST | 해외주식분봉조회 | GET | /uapi/overseas-price/v1/quotations/inquire-time-itemchartprice | Not Implemented |
| REST | 해외주식 현재가상세 | GET | /uapi/overseas-price/v1/quotations/price-detail | Not Implemented |
| REST | 해외주식 업종별코드조회 | GET | /uapi/overseas-price/v1/quotations/industry-price | Not Implemented |
| REST | 해외주식 종목/지수/환율기간별시세(일/주/월/년) | GET | /uapi/overseas-price/v1/quotations/inquire-daily-chartprice | Not Implemented |
| REST | 해외주식 업종별시세 | GET | /uapi/overseas-price/v1/quotations/industry-theme | Not Implemented |
| REST | 해외주식 현재가 1호가 | GET | /uapi/overseas-price/v1/quotations/inquire-asking-price | Not Implemented |
| REST | 해외주식 거래증가율순위 | GET | /uapi/overseas-stock/v1/ranking/trade-growth | Not Implemented |
| REST | 해외주식 기간별권리조회 | GET | /uapi/overseas-price/v1/quotations/period-rights | Not Implemented |
| REST | 해외주식 가격급등락 | GET | /uapi/overseas-stock/v1/ranking/price-fluct | Not Implemented |
| REST | 해외주식 거래대금순위 | GET | /uapi/overseas-stock/v1/ranking/trade-pbmn | Not Implemented |
| REST | 해외주식 거래량급증 | GET | /uapi/overseas-stock/v1/ranking/volume-surge | Not Implemented |
| REST | 해외주식 신고/신저가 | GET | /uapi/overseas-stock/v1/ranking/new-highlow | Implemented |
| REST | 해외주식 매수체결강도상위 | GET | /uapi/overseas-stock/v1/ranking/volume-power | Not Implemented |
| REST | 해외주식 거래회전율순위 | GET | /uapi/overseas-stock/v1/ranking/trade-turnover | Not Implemented |
| REST | 해외뉴스종합(제목) | GET | /uapi/overseas-price/v1/quotations/news-title | Not Implemented |
| REST | 당사 해외주식담보대출 가능 종목 | GET | /uapi/overseas-price/v1/quotations/colable-by-company | Not Implemented |
| REST | 해외주식 시가총액순위 | GET | /uapi/overseas-stock/v1/ranking/market-cap | Implemented |
| REST | 해외속보(제목) | GET | /uapi/overseas-price/v1/quotations/brknews-title | Not Implemented |
| REST | 해외주식 상승율/하락율 | GET | /uapi/overseas-stock/v1/ranking/updown-rate | Not Implemented |
| REST | 해외주식 권리종합 | GET | /uapi/overseas-price/v1/quotations/rights-by-ice | Not Implemented |
| REST | 해외주식 거래량순위 | GET | /uapi/overseas-stock/v1/ranking/trade-vol | Not Implemented |
| WEBSOCKET | 해외주식 실시간호가 | POST | /tryitout/HDFSASP0 | Not Implemented |
| WEBSOCKET | 해외주식 지연호가(아시아) | POST | /tryitout/HDFSASP1 | Not Implemented |
| WEBSOCKET | 해외주식 실시간지연체결가 | POST | /tryitout/HDFSCNT0 | Not Implemented |
| WEBSOCKET | 해외주식 실시간체결통보 | POST | /tryitout/H0GSCNI0 | Not Implemented |
| REST | 해외선물옵션 주문 | POST | /uapi/overseas-futureoption/v1/trading/order | Not Implemented |
| REST | 해외선물옵션 정정취소주문 | POST | /uapi/overseas-futureoption/v1/trading/order-rvsecncl | Not Implemented |
| REST | 해외선물옵션 당일주문내역조회 | GET | /uapi/overseas-futureoption/v1/trading/inquire-ccld | Not Implemented |
| REST | 해외선물옵션 미결제내역조회(잔고) | GET | /uapi/overseas-futureoption/v1/trading/inquire-unpd | Not Implemented |
| REST | 해외선물옵션 주문가능조회 | GET | /uapi/overseas-futureoption/v1/trading/inquire-psamount | Not Implemented |
| REST | 해외선물옵션 기간계좌손익 일별 | GET | /uapi/overseas-futureoption/v1/trading/inquire-period-ccld | Not Implemented |
| REST | 해외선물옵션 일별 체결내역 | GET | /uapi/overseas-futureoption/v1/trading/inquire-daily-ccld | Not Implemented |
| REST | 해외선물옵션 예수금현황 | GET | /uapi/overseas-futureoption/v1/trading/inquire-deposit | Not Implemented |
| REST | 해외선물옵션 일별 주문내역 | GET | /uapi/overseas-futureoption/v1/trading/inquire-daily-order | Not Implemented |
| REST | 해외선물옵션 기간계좌거래내역 | GET | /uapi/overseas-futureoption/v1/trading/inquire-period-trans | Not Implemented |
| REST | 해외선물옵션 증거금상세 | GET | /uapi/overseas-futureoption/v1/trading/margin-detail | Not Implemented |
| REST | 해외선물종목현재가 | GET | /uapi/overseas-futureoption/v1/quotations/inquire-price | Not Implemented |
| REST | 해외선물종목상세 | GET | /uapi/overseas-futureoption/v1/quotations/stock-detail | Not Implemented |
| REST | 해외선물 호가 | GET | /uapi/overseas-futureoption/v1/quotations/inquire-asking-price | Not Implemented |
| REST | 해외선물 분봉조회 | GET | /uapi/overseas-futureoption/v1/quotations/inquire-time-futurechartprice | Not Implemented |
| REST | 해외선물 체결추이(틱) | GET | /uapi/overseas-futureoption/v1/quotations/tick-ccnl | Not Implemented |
| REST | 해외선물 체결추이(주간) | GET | /uapi/overseas-futureoption/v1/quotations/weekly-ccnl | Not Implemented |
| REST | 해외선물 체결추이(일간) | GET | /uapi/overseas-futureoption/v1/quotations/daily-ccnl | Not Implemented |
| REST | 해외선물 체결추이(월간) | GET | /uapi/overseas-futureoption/v1/quotations/monthly-ccnl | Not Implemented |
| REST | 해외선물 상품기본정보 | GET | /uapi/overseas-futureoption/v1/quotations/search-contract-detail | Not Implemented |
| REST | 해외선물 미결제추이 | GET | /uapi/overseas-futureoption/v1/quotations/investor-unpd-trend | Not Implemented |
| REST | 해외옵션종목현재가 | GET | /uapi/overseas-futureoption/v1/quotations/opt-price | Not Implemented |
| REST | 해외옵션종목상세 | GET | /uapi/overseas-futureoption/v1/quotations/opt-detail | Not Implemented |
| REST | 해외옵션 호가 | GET | /uapi/overseas-futureoption/v1/quotations/opt-asking-price | Not Implemented |
| REST | 해외옵션 분봉조회 | GET | /uapi/overseas-futureoption/v1/quotations/inquire-time-optchartprice | Not Implemented |
| REST | 해외옵션 체결추이(틱) | GET | /uapi/overseas-futureoption/v1/quotations/opt-tick-ccnl | Not Implemented |
| REST | 해외옵션 체결추이(일간) | GET | /uapi/overseas-futureoption/v1/quotations/opt-daily-ccnl | Not Implemented |
| REST | 해외옵션 체결추이(주간) | GET | /uapi/overseas-futureoption/v1/quotations/opt-weekly-ccnl | Not Implemented |
| REST | 해외옵션 체결추이(월간) | GET | /uapi/overseas-futureoption/v1/quotations/opt-monthly-ccnl | Not Implemented |
| REST | 해외옵션 상품기본정보 | GET | /uapi/overseas-futureoption/v1/quotations/search-opt-detail | Not Implemented |
| REST | 해외선물옵션 장운영시간 | GET | /uapi/overseas-futureoption/v1/quotations/market-time | Not Implemented |
| WEBSOCKET | 해외선물옵션 실시간체결가 | POST | /tryitout/HDFFF020 | Not Implemented |
| WEBSOCKET | 해외선물옵션 실시간호가 | POST | /tryitout/HDFFF010 | Not Implemented |
| WEBSOCKET | 해외선물옵션 실시간주문내역통보 | POST | /tryitout/HDFFF1C0 | Not Implemented |
| WEBSOCKET | 해외선물옵션 실시간체결내역통보 | POST | /tryitout/HDFFF2C0 | Not Implemented |
| REST | 장내채권 매수주문 | POST | /uapi/domestic-bond/v1/trading/buy | Not Implemented |
| REST | 장내채권 매도주문 | POST | /uapi/domestic-bond/v1/trading/sell | Not Implemented |
| REST | 장내채권 정정취소주문 | POST | /uapi/domestic-bond/v1/trading/order-rvsecncl | Not Implemented |
| REST | 채권정정취소가능주문조회 | GET | /uapi/domestic-bond/v1/trading/inquire-psbl-rvsecncl | Not Implemented |
| REST | 장내채권 주문체결내역 | GET | /uapi/domestic-bond/v1/trading/inquire-daily-ccld | Not Implemented |
| REST | 장내채권 잔고조회 | GET | /uapi/domestic-bond/v1/trading/inquire-balance | Not Implemented |
| REST | 장내채권 매수가능조회 | GET | /uapi/domestic-bond/v1/trading/inquire-psbl-order | Not Implemented |
| REST | 장내채권현재가(호가) | GET | /uapi/domestic-bond/v1/quotations/inquire-asking-price | Not Implemented |
| REST | 장내채권현재가(시세) | GET | /uapi/domestic-bond/v1/quotations/inquire-price | Not Implemented |
| REST | 장내채권현재가(체결) | GET | /uapi/domestic-bond/v1/quotations/inquire-ccnl | Not Implemented |
| REST | 장내채권현재가(일별) | GET | /uapi/domestic-bond/v1/quotations/inquire-daily-price | Not Implemented |
| REST | 장내채권 기간별시세(일) | GET | /uapi/domestic-bond/v1/quotations/inquire-daily-itemchartprice | Not Implemented |
| REST | 장내채권 평균단가조회 | GET | /uapi/domestic-bond/v1/quotations/avg-unit | Not Implemented |
| REST | 장내채권 발행정보 | GET | /uapi/domestic-bond/v1/quotations/issue-info | Not Implemented |
| REST | 장내채권 기본조회 | GET | /uapi/domestic-bond/v1/quotations/search-bond-info | Not Implemented |
| WEBSOCKET | 일반채권 실시간체결가 | POST | /tryitout/H0BJCNT0 | Not Implemented |
| WEBSOCKET | 일반채권 실시간호가 | POST | /tryitout/H0BJASP0 | Not Implemented |
| WEBSOCKET | 채권지수 실시간체결가 | POST | /tryitout/H0BICNT0 | Not Implemented |