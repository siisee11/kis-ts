
import { KisClient } from "./index";
import {
    fetchOverseasDailyPrice,
    type FetchOverseasDailyPriceRequest,
    type FetchOverseasDailyPriceResponse,
} from "../api/overseas-stock/quotations/dailyprice";
import {
    fetchOverseasPrice,
    type FetchOverseasPriceRequest,
    type FetchOverseasPriceResponse,
} from "../api/overseas-stock/quotations/price";
import {
    searchOverseasStock,
    type SearchOverseasStockRequest,
    type SearchOverseasStockResponse,
} from "../api/overseas-stock/quotations/search-info";
import {
    fetchOverseasMarketCapRanking,
    type FetchOverseasMarketCapRankingRequest,
    type FetchOverseasMarketCapRankingResponse,
} from "../api/overseas-stock/ranking/market-cap";
import {
    fetchOverseasNewHighlow,
    type FetchOverseasNewHighlowRequest,
    type FetchOverseasNewHighlowResponse,
} from "../api/overseas-stock/ranking/new-highlow";
import {
    placeOverseasDaytimeOrder,
    type PlaceOverseasDaytimeOrderRequest,
    type PlaceOverseasDaytimeOrderResponse,
} from "../api/overseas-stock/trading/daytime-order";
import {
    reviseCancelOverseasDaytimeOrder,
    type ReviseCancelOverseasDaytimeOrderRequest,
    type ReviseCancelOverseasDaytimeOrderResponse,
} from "../api/overseas-stock/trading/daytime-order-rvsecncl";
import {
    inquireOverseasBalance,
    type InquireOverseasBalanceRequest,
    type InquireOverseasBalanceResponse,
} from "../api/overseas-stock/trading/inquire-balance";
import {
    inquireOverseasCcnl,
    type InquireOverseasCcnlRequest,
    type InquireOverseasCcnlResponse,
} from "../api/overseas-stock/trading/inquire-ccnl";
import {
    inquireOverseasNccs,
    type InquireOverseasNccsRequest,
    type InquireOverseasNccsResponse,
} from "../api/overseas-stock/trading/inquire-nccs";
import {
    inquireOverseasPaymtStdrBalance,
    type InquireOverseasPaymtStdrBalanceRequest,
    type InquireOverseasPaymtStdrBalanceResponse,
} from "../api/overseas-stock/trading/inquire-paymt-stdr-balance";
import {
    inquireOverseasPeriodProfit,
    type InquireOverseasPeriodProfitRequest,
    type InquireOverseasPeriodProfitResponse,
} from "../api/overseas-stock/trading/inquire-period-profit";
import {
    inquireOverseasPeriodTrans,
    type InquireOverseasPeriodTransRequest,
    type InquireOverseasPeriodTransResponse,
} from "../api/overseas-stock/trading/inquire-period-trans";
import {
    inquireOverseasPresentBalance,
    type InquireOverseasPresentBalanceRequest,
    type InquireOverseasPresentBalanceResponse,
} from "../api/overseas-stock/trading/inquire-present-balance";
import {
    inquireOverseasPsamount,
    type InquireOverseasPsamountRequest,
    type InquireOverseasPsamountResponse,
} from "../api/overseas-stock/trading/inquire-psamount";
import {
    placeOverseasOrder,
    type PlaceOverseasOrderRequest,
    type PlaceOverseasOrderResponse,
} from "../api/overseas-stock/trading/order";
import {
    placeOverseasReserveOrder,
    type PlaceOverseasReserveOrderRequest,
    type PlaceOverseasReserveOrderResponse,
} from "../api/overseas-stock/trading/order-resv";
import {
    cancelOverseasReserveOrder,
    type CancelOverseasReserveOrderRequest,
    type CancelOverseasReserveOrderResponse,
} from "../api/overseas-stock/trading/order-resv-ccnl";
import {
    listOverseasReserveOrders,
    type ListOverseasReserveOrdersRequest,
    type ListOverseasReserveOrdersResponse,
} from "../api/overseas-stock/trading/order-resv-list";
import {
    reviseCancelOverseasOrder,
    type ReviseCancelOverseasOrderRequest,
    type ReviseCancelOverseasOrderResponse,
} from "../api/overseas-stock/trading/order-rvsecncl";

export class KisOverseasClient {
    constructor(private client: KisClient) { }

    private get context() {
        const token = this.client.getAccessTokenValue();
        if (!token) {
            throw new Error("Access token is not set. Call client.setAccessToken() first.");
        }
        return this.client.getOverseasContext(token);
    }

    async fetchOverseasDailyPrice(request: FetchOverseasDailyPriceRequest): Promise<FetchOverseasDailyPriceResponse> {
        return fetchOverseasDailyPrice(this.context, request);
    }

    async fetchOverseasPrice(request: FetchOverseasPriceRequest): Promise<FetchOverseasPriceResponse> {
        return fetchOverseasPrice(this.context, request);
    }

    async searchOverseasStock(request: SearchOverseasStockRequest): Promise<SearchOverseasStockResponse> {
        return searchOverseasStock(this.context, request);
    }

    async fetchOverseasMarketCapRanking(request: FetchOverseasMarketCapRankingRequest): Promise<FetchOverseasMarketCapRankingResponse> {
        return fetchOverseasMarketCapRanking(this.context, request);
    }

    async fetchOverseasNewHighlow(request: FetchOverseasNewHighlowRequest): Promise<FetchOverseasNewHighlowResponse> {
        return fetchOverseasNewHighlow(this.context, request);
    }

    async placeOverseasDaytimeOrder(request: PlaceOverseasDaytimeOrderRequest): Promise<PlaceOverseasDaytimeOrderResponse> {
        return placeOverseasDaytimeOrder(this.context, request);
    }

    async reviseCancelOverseasDaytimeOrder(request: ReviseCancelOverseasDaytimeOrderRequest): Promise<ReviseCancelOverseasDaytimeOrderResponse> {
        return reviseCancelOverseasDaytimeOrder(this.context, request);
    }

    async inquireOverseasBalance(request: InquireOverseasBalanceRequest): Promise<InquireOverseasBalanceResponse> {
        return inquireOverseasBalance(this.context, request);
    }

    async inquireOverseasCcnl(request: InquireOverseasCcnlRequest): Promise<InquireOverseasCcnlResponse> {
        return inquireOverseasCcnl(this.context, request);
    }

    async inquireOverseasNccs(request: InquireOverseasNccsRequest): Promise<InquireOverseasNccsResponse> {
        return inquireOverseasNccs(this.context, request);
    }

    async inquireOverseasPaymtStdrBalance(request: InquireOverseasPaymtStdrBalanceRequest): Promise<InquireOverseasPaymtStdrBalanceResponse> {
        return inquireOverseasPaymtStdrBalance(this.context, request);
    }

    async inquireOverseasPeriodProfit(request: InquireOverseasPeriodProfitRequest): Promise<InquireOverseasPeriodProfitResponse> {
        return inquireOverseasPeriodProfit(this.context, request);
    }

    async inquireOverseasPeriodTrans(request: InquireOverseasPeriodTransRequest): Promise<InquireOverseasPeriodTransResponse> {
        return inquireOverseasPeriodTrans(this.context, request);
    }

    async inquireOverseasPresentBalance(request: InquireOverseasPresentBalanceRequest): Promise<InquireOverseasPresentBalanceResponse> {
        return inquireOverseasPresentBalance(this.context, request);
    }

    async inquireOverseasPsamount(request: InquireOverseasPsamountRequest): Promise<InquireOverseasPsamountResponse> {
        return inquireOverseasPsamount(this.context, request);
    }

    async placeOverseasOrder(request: PlaceOverseasOrderRequest): Promise<PlaceOverseasOrderResponse> {
        return placeOverseasOrder(this.context, request);
    }

    async placeOverseasReserveOrder(request: PlaceOverseasReserveOrderRequest): Promise<PlaceOverseasReserveOrderResponse> {
        return placeOverseasReserveOrder(this.context, request);
    }

    async cancelOverseasReserveOrder(request: CancelOverseasReserveOrderRequest): Promise<CancelOverseasReserveOrderResponse> {
        return cancelOverseasReserveOrder(this.context, request);
    }

    async listOverseasReserveOrders(request: ListOverseasReserveOrdersRequest): Promise<ListOverseasReserveOrdersResponse> {
        return listOverseasReserveOrders(this.context, request);
    }

    async reviseCancelOverseasOrder(request: ReviseCancelOverseasOrderRequest): Promise<ReviseCancelOverseasOrderResponse> {
        return reviseCancelOverseasOrder(this.context, request);
    }
}
