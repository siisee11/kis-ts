
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

    private async getContext() {
        const token = await this.client.ensureAccessToken();
        return this.client.getOverseasContext(token);
    }

    async fetchOverseasDailyPrice(request: FetchOverseasDailyPriceRequest): Promise<FetchOverseasDailyPriceResponse> {
        return fetchOverseasDailyPrice(await this.getContext(), request);
    }

    async fetchOverseasPrice(request: FetchOverseasPriceRequest): Promise<FetchOverseasPriceResponse> {
        return fetchOverseasPrice(await this.getContext(), request);
    }

    async searchOverseasStock(request: SearchOverseasStockRequest): Promise<SearchOverseasStockResponse> {
        return searchOverseasStock(await this.getContext(), request);
    }

    async fetchOverseasMarketCapRanking(request: FetchOverseasMarketCapRankingRequest): Promise<FetchOverseasMarketCapRankingResponse> {
        return fetchOverseasMarketCapRanking(await this.getContext(), request);
    }

    async fetchOverseasNewHighlow(request: FetchOverseasNewHighlowRequest): Promise<FetchOverseasNewHighlowResponse> {
        return fetchOverseasNewHighlow(await this.getContext(), request);
    }

    async placeOverseasDaytimeOrder(request: PlaceOverseasDaytimeOrderRequest): Promise<PlaceOverseasDaytimeOrderResponse> {
        return placeOverseasDaytimeOrder(await this.getContext(), request);
    }

    async reviseCancelOverseasDaytimeOrder(request: ReviseCancelOverseasDaytimeOrderRequest): Promise<ReviseCancelOverseasDaytimeOrderResponse> {
        return reviseCancelOverseasDaytimeOrder(await this.getContext(), request);
    }

    async inquireOverseasBalance(request: InquireOverseasBalanceRequest): Promise<InquireOverseasBalanceResponse> {
        return inquireOverseasBalance(await this.getContext(), request);
    }

    async inquireOverseasCcnl(request: InquireOverseasCcnlRequest): Promise<InquireOverseasCcnlResponse> {
        return inquireOverseasCcnl(await this.getContext(), request);
    }

    async inquireOverseasNccs(request: InquireOverseasNccsRequest): Promise<InquireOverseasNccsResponse> {
        return inquireOverseasNccs(await this.getContext(), request);
    }

    async inquireOverseasPaymtStdrBalance(request: InquireOverseasPaymtStdrBalanceRequest): Promise<InquireOverseasPaymtStdrBalanceResponse> {
        return inquireOverseasPaymtStdrBalance(await this.getContext(), request);
    }

    async inquireOverseasPeriodProfit(request: InquireOverseasPeriodProfitRequest): Promise<InquireOverseasPeriodProfitResponse> {
        return inquireOverseasPeriodProfit(await this.getContext(), request);
    }

    async inquireOverseasPeriodTrans(request: InquireOverseasPeriodTransRequest): Promise<InquireOverseasPeriodTransResponse> {
        return inquireOverseasPeriodTrans(await this.getContext(), request);
    }

    async inquireOverseasPresentBalance(request: InquireOverseasPresentBalanceRequest): Promise<InquireOverseasPresentBalanceResponse> {
        return inquireOverseasPresentBalance(await this.getContext(), request);
    }

    async inquireOverseasPsamount(request: InquireOverseasPsamountRequest): Promise<InquireOverseasPsamountResponse> {
        return inquireOverseasPsamount(await this.getContext(), request);
    }

    async placeOverseasOrder(request: PlaceOverseasOrderRequest): Promise<PlaceOverseasOrderResponse> {
        return placeOverseasOrder(await this.getContext(), request);
    }

    async placeOverseasReserveOrder(request: PlaceOverseasReserveOrderRequest): Promise<PlaceOverseasReserveOrderResponse> {
        return placeOverseasReserveOrder(await this.getContext(), request);
    }

    async cancelOverseasReserveOrder(request: CancelOverseasReserveOrderRequest): Promise<CancelOverseasReserveOrderResponse> {
        return cancelOverseasReserveOrder(await this.getContext(), request);
    }

    async listOverseasReserveOrders(request: ListOverseasReserveOrdersRequest): Promise<ListOverseasReserveOrdersResponse> {
        return listOverseasReserveOrders(await this.getContext(), request);
    }

    async reviseCancelOverseasOrder(request: ReviseCancelOverseasOrderRequest): Promise<ReviseCancelOverseasOrderResponse> {
        return reviseCancelOverseasOrder(await this.getContext(), request);
    }
}
