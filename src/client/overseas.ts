
import { KisClient } from "./index";
import {
    fetchOverseasDailyPrice,
    type FetchOverseasDailyPriceRequest,
    type FetchOverseasDailyPriceResponse,
} from "../api/overseas/quotations/dailyprice";
import {
    fetchOverseasPrice,
    type FetchOverseasPriceRequest,
    type FetchOverseasPriceResponse,
} from "../api/overseas/quotations/price";
import {
    searchOverseasStock,
    type SearchOverseasStockRequest,
    type SearchOverseasStockResponse,
} from "../api/overseas/quotations/search-info";
import {
    fetchOverseasMarketCapRanking,
    type FetchOverseasMarketCapRankingRequest,
    type FetchOverseasMarketCapRankingResponse,
} from "../api/overseas/ranking/market-cap";
import {
    fetchOverseasNewHighlow,
    type FetchOverseasNewHighlowRequest,
    type FetchOverseasNewHighlowResponse,
} from "../api/overseas/ranking/new-highlow";
import {
    placeOverseasDaytimeOrder,
    type PlaceOverseasDaytimeOrderRequest,
    type PlaceOverseasDaytimeOrderResponse,
} from "../api/overseas/trading/daytime-order";
import {
    reviseCancelOverseasDaytimeOrder,
    type ReviseCancelOverseasDaytimeOrderRequest,
    type ReviseCancelOverseasDaytimeOrderResponse,
} from "../api/overseas/trading/daytime-order-rvsecncl";
import {
    inquireOverseasBalance,
    type InquireOverseasBalanceRequest,
    type InquireOverseasBalanceResponse,
} from "../api/overseas/trading/inquire-balance";
import {
    inquireOverseasCcnl,
    type InquireOverseasCcnlRequest,
    type InquireOverseasCcnlResponse,
} from "../api/overseas/trading/inquire-ccnl";
import {
    inquireOverseasNccs,
    type InquireOverseasNccsRequest,
    type InquireOverseasNccsResponse,
} from "../api/overseas/trading/inquire-nccs";
import {
    inquireOverseasPaymtStdrBalance,
    type InquireOverseasPaymtStdrBalanceRequest,
    type InquireOverseasPaymtStdrBalanceResponse,
} from "../api/overseas/trading/inquire-paymt-stdr-balance";
import {
    inquireOverseasPeriodProfit,
    type InquireOverseasPeriodProfitRequest,
    type InquireOverseasPeriodProfitResponse,
} from "../api/overseas/trading/inquire-period-profit";
import {
    inquireOverseasPeriodTrans,
    type InquireOverseasPeriodTransRequest,
    type InquireOverseasPeriodTransResponse,
} from "../api/overseas/trading/inquire-period-trans";
import {
    inquireOverseasPresentBalance,
    type InquireOverseasPresentBalanceRequest,
    type InquireOverseasPresentBalanceResponse,
} from "../api/overseas/trading/inquire-present-balance";
import {
    inquireOverseasPsamount,
    type InquireOverseasPsamountRequest,
    type InquireOverseasPsamountResponse,
} from "../api/overseas/trading/inquire-psamount";
import {
    placeOverseasOrder,
    type PlaceOverseasOrderRequest,
    type PlaceOverseasOrderResponse,
} from "../api/overseas/trading/order";
import {
    placeOverseasReserveOrder,
    type PlaceOverseasReserveOrderRequest,
    type PlaceOverseasReserveOrderResponse,
} from "../api/overseas/trading/order-resv";
import {
    cancelOverseasReserveOrder,
    type CancelOverseasReserveOrderRequest,
    type CancelOverseasReserveOrderResponse,
} from "../api/overseas/trading/order-resv-ccnl";
import {
    listOverseasReserveOrders,
    type ListOverseasReserveOrdersRequest,
    type ListOverseasReserveOrdersResponse,
} from "../api/overseas/trading/order-resv-list";
import {
    reviseCancelOverseasOrder,
    type ReviseCancelOverseasOrderRequest,
    type ReviseCancelOverseasOrderResponse,
} from "../api/overseas/trading/order-rvsecncl";

/**
 * Client for Overseas Stock APIs.
 */
export class KisOverseasClient {
    constructor(private client: KisClient) { }

    private async getContext() {
        const token = await this.client.ensureAccessToken();
        return this.client.getOverseasContext(token);
    }

    /**
     * Fetches daily price history for an overseas stock.
     *
     * @param {FetchOverseasDailyPriceRequest} request - The request parameters.
     * @returns {Promise<FetchOverseasDailyPriceResponse>} The daily price data.
     */
    async fetchOverseasDailyPrice(request: FetchOverseasDailyPriceRequest): Promise<FetchOverseasDailyPriceResponse> {
        return fetchOverseasDailyPrice(await this.getContext(), request);
    }

    /**
     * 해외주식 현재체결가 [v1_해외주식-009]
     *
     * 해외주식종목의 현재체결가를 확인하는 API 입니다.
     * 해외주식 시세는 무료시세(지연체결가)만이 제공되며, API로는 유료시세(실시간체결가)를 받아보실 수 없습니다.
     *
     * @see https://openapi.koreainvestment.com:9443/uapi/overseas-price/v1/quotations/price
     *
     * @param {FetchOverseasPriceRequest} request - The request parameters (symbol, exchange).
     * @returns {Promise<FetchOverseasPriceResponse>} The current price data.
     */
    async fetchOverseasPrice(request: FetchOverseasPriceRequest): Promise<FetchOverseasPriceResponse> {
        return fetchOverseasPrice(await this.getContext(), request);
    }

    /**
     * Searches for overseas stocks.
     *
     * @param {SearchOverseasStockRequest} request - The search parameters.
     * @param {string} request.prdtTypeCd - 상품유형코드: 512=미국 나스닥, 513=미국 뉴욕, 529=미국 아멕스, 515=일본, 501=홍콩, 543=홍콩CNY, 558=홍콩USD, 507=베트남 하노이, 508=베트남 호치민, 551=중국 상해A, 552=중국 심천A
     * @param {string} request.pdno - 상품번호 (예: AAPL)
     * @returns {Promise<SearchOverseasStockResponse>} The search results.
     */
    async searchOverseasStock(request: SearchOverseasStockRequest): Promise<SearchOverseasStockResponse> {
        return searchOverseasStock(await this.getContext(), request);
    }

    /**
     * Fetches overseas market cap ranking.
     *
     * @param {FetchOverseasMarketCapRankingRequest} request - The request parameters.
     * @returns {Promise<FetchOverseasMarketCapRankingResponse>} The market cap ranking.
     */
    async fetchOverseasMarketCapRanking(request: FetchOverseasMarketCapRankingRequest): Promise<FetchOverseasMarketCapRankingResponse> {
        return fetchOverseasMarketCapRanking(await this.getContext(), request);
    }

    /**
     * Fetches overseas new high/low ranking.
     *
     * @param {FetchOverseasNewHighlowRequest} request - The request parameters.
     * @returns {Promise<FetchOverseasNewHighlowResponse>} The new high/low ranking.
     */
    async fetchOverseasNewHighlow(request: FetchOverseasNewHighlowRequest): Promise<FetchOverseasNewHighlowResponse> {
        return fetchOverseasNewHighlow(await this.getContext(), request);
    }

    /**
     * Places a daytime order for overseas stock.
     *
     * @param {PlaceOverseasDaytimeOrderRequest} request - The order parameters.
     * @returns {Promise<PlaceOverseasDaytimeOrderResponse>} The order result.
     */
    async placeOverseasDaytimeOrder(request: PlaceOverseasDaytimeOrderRequest): Promise<PlaceOverseasDaytimeOrderResponse> {
        return placeOverseasDaytimeOrder(await this.getContext(), request);
    }

    /**
     * Revises or cancels a daytime overseas order.
     *
     * @param {ReviseCancelOverseasDaytimeOrderRequest} request - The request parameters.
     * @returns {Promise<ReviseCancelOverseasDaytimeOrderResponse>} The result.
     */
    async reviseCancelOverseasDaytimeOrder(request: ReviseCancelOverseasDaytimeOrderRequest): Promise<ReviseCancelOverseasDaytimeOrderResponse> {
        return reviseCancelOverseasDaytimeOrder(await this.getContext(), request);
    }

    /**
     * Inquires overseas stock balance.
     *
     * @param {InquireOverseasBalanceRequest} request - The request parameters.
     * @returns {Promise<InquireOverseasBalanceResponse>} The balance information.
     */
    async inquireOverseasBalance(request: InquireOverseasBalanceRequest): Promise<InquireOverseasBalanceResponse> {
        return inquireOverseasBalance(await this.getContext(), request);
    }

    /**
     * Inquires overseas concluded orders (CCNL).
     *
     * @param {InquireOverseasCcnlRequest} request - The request parameters.
     * @returns {Promise<InquireOverseasCcnlResponse>} The concluded orders.
     */
    async inquireOverseasCcnl(request: InquireOverseasCcnlRequest): Promise<InquireOverseasCcnlResponse> {
        return inquireOverseasCcnl(await this.getContext(), request);
    }

    /**
     * Inquires overseas non-concluded orders (NCCS).
     *
     * @param {InquireOverseasNccsRequest} request - The request parameters.
     * @returns {Promise<InquireOverseasNccsResponse>} The non-concluded orders.
     */
    async inquireOverseasNccs(request: InquireOverseasNccsRequest): Promise<InquireOverseasNccsResponse> {
        return inquireOverseasNccs(await this.getContext(), request);
    }

    /**
     * Inquires overseas payment standard balance.
     *
     * @param {InquireOverseasPaymtStdrBalanceRequest} request - The request parameters.
     * @returns {Promise<InquireOverseasPaymtStdrBalanceResponse>} The payment standard balance.
     */
    async inquireOverseasPaymtStdrBalance(request: InquireOverseasPaymtStdrBalanceRequest): Promise<InquireOverseasPaymtStdrBalanceResponse> {
        return inquireOverseasPaymtStdrBalance(await this.getContext(), request);
    }

    /**
     * Inquires overseas period profit.
     *
     * @param {InquireOverseasPeriodProfitRequest} request - The request parameters.
     * @returns {Promise<InquireOverseasPeriodProfitResponse>} The period profit data.
     */
    async inquireOverseasPeriodProfit(request: InquireOverseasPeriodProfitRequest): Promise<InquireOverseasPeriodProfitResponse> {
        return inquireOverseasPeriodProfit(await this.getContext(), request);
    }

    /**
     * Inquires overseas period transaction history.
     *
     * @param {InquireOverseasPeriodTransRequest} request - The request parameters.
     * @returns {Promise<InquireOverseasPeriodTransResponse>} The transaction history.
     */
    async inquireOverseasPeriodTrans(request: InquireOverseasPeriodTransRequest): Promise<InquireOverseasPeriodTransResponse> {
        return inquireOverseasPeriodTrans(await this.getContext(), request);
    }

    /**
     * Inquires overseas present balance.
     *
     * @param {InquireOverseasPresentBalanceRequest} request - The request parameters.
     * @returns {Promise<InquireOverseasPresentBalanceResponse>} The present balance.
     */
    async inquireOverseasPresentBalance(request: InquireOverseasPresentBalanceRequest): Promise<InquireOverseasPresentBalanceResponse> {
        return inquireOverseasPresentBalance(await this.getContext(), request);
    }

    /**
     * Inquires overseas possible order amount (PSAMOUNT).
     *
     * @param {InquireOverseasPsamountRequest} request - The request parameters.
     * @returns {Promise<InquireOverseasPsamountResponse>} The possible order amount.
     */
    async inquireOverseasPsamount(request: InquireOverseasPsamountRequest): Promise<InquireOverseasPsamountResponse> {
        return inquireOverseasPsamount(await this.getContext(), request);
    }

    /**
     * Places an overseas stock order.
     *
     * @param {PlaceOverseasOrderRequest} request - The order parameters.
     * @returns {Promise<PlaceOverseasOrderResponse>} The order result.
     */
    async placeOverseasOrder(request: PlaceOverseasOrderRequest): Promise<PlaceOverseasOrderResponse> {
        return placeOverseasOrder(await this.getContext(), request);
    }

    /**
     * Places an overseas reserve order.
     *
     * @param {PlaceOverseasReserveOrderRequest} request - The reserve order parameters.
     * @returns {Promise<PlaceOverseasReserveOrderResponse>} The reserve order result.
     */
    async placeOverseasReserveOrder(request: PlaceOverseasReserveOrderRequest): Promise<PlaceOverseasReserveOrderResponse> {
        return placeOverseasReserveOrder(await this.getContext(), request);
    }

    /**
     * Cancels an overseas reserve order.
     *
     * @param {CancelOverseasReserveOrderRequest} request - The cancellation parameters.
     * @returns {Promise<CancelOverseasReserveOrderResponse>} The cancellation result.
     */
    async cancelOverseasReserveOrder(request: CancelOverseasReserveOrderRequest): Promise<CancelOverseasReserveOrderResponse> {
        return cancelOverseasReserveOrder(await this.getContext(), request);
    }

    /**
     * Lists overseas reserve orders.
     *
     * @param {ListOverseasReserveOrdersRequest} request - The request parameters.
     * @returns {Promise<ListOverseasReserveOrdersResponse>} The list of reserve orders.
     */
    async listOverseasReserveOrders(request: ListOverseasReserveOrdersRequest): Promise<ListOverseasReserveOrdersResponse> {
        return listOverseasReserveOrders(await this.getContext(), request);
    }

    /**
     * Revises or cancels an overseas order.
     *
     * @param {ReviseCancelOverseasOrderRequest} request - The request parameters.
     * @returns {Promise<ReviseCancelOverseasOrderResponse>} The result.
     */
    async reviseCancelOverseasOrder(request: ReviseCancelOverseasOrderRequest): Promise<ReviseCancelOverseasOrderResponse> {
        return reviseCancelOverseasOrder(await this.getContext(), request);
    }
}
