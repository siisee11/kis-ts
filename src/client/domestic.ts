
import { KisClient } from "./index";
import {
    captureUplowprice,
    type CaptureUplowpriceRequest,
    type CaptureUplowpriceResponse,
} from "../api/domestic-stock/quotations/capture-uplowprice";
import {
    checkHoliday,
    type CheckHolidayRequest,
    type CheckHolidayResponse,
} from "../api/domestic-stock/quotations/check-holiday";
import {
    fetchDailyCreditBalance,
    type DailyCreditBalanceRequest,
    type DailyCreditBalanceResponse,
} from "../api/domestic-stock/quotations/daily-credit-balance";
import {
    searchInfo,
    type SearchInfoRequest,
    type SearchInfoResponse,
} from "../api/domestic-stock/quotations/search-info";
import {
    searchStockInfo,
    type SearchStockInfoRequest,
    type SearchStockInfoResponse,
} from "../api/domestic-stock/quotations/search-stock-info";
import {
    fetchAfterHourBalance,
    type FetchAfterHourBalanceRequest,
    type FetchAfterHourBalanceResponse,
} from "../api/domestic-stock/ranking/after-hour-balance";
import {
    fetchBulkTransactionCount,
    type FetchBulkTransactionCountRequest,
    type FetchBulkTransactionCountResponse,
} from "../api/domestic-stock/ranking/bulk-transaction-count";
import {
    fetchCreditBalance,
    type FetchCreditBalanceRequest,
    type FetchCreditBalanceResponse,
} from "../api/domestic-stock/ranking/credit-balance";
import {
    inquirePsblOrder,
    type InquirePsblOrderRequest,
    type InquirePsblOrderResponse,
} from "../api/domestic-stock/trading/inquire-psbl-order";
import {
    placeDomesticCashOrder,
    type PlaceDomesticCashOrderRequest,
    type PlaceDomesticCashOrderResponse,
} from "../api/domestic-stock/trading/order-cash";

export class KisDomesticClient {
    constructor(private client: KisClient) { }

    private get context() {
        const token = this.client.getAccessTokenValue();
        if (!token) {
            throw new Error("Access token is not set. Call client.setAccessToken() first.");
        }
        return this.client.getDomesticContext(token);
    }

    async captureUplowprice(request: CaptureUplowpriceRequest): Promise<CaptureUplowpriceResponse> {
        return captureUplowprice(this.context, request);
    }

    async checkHoliday(request: CheckHolidayRequest): Promise<CheckHolidayResponse> {
        return checkHoliday(this.context, request);
    }

    async fetchDailyCreditBalance(request: DailyCreditBalanceRequest): Promise<DailyCreditBalanceResponse> {
        return fetchDailyCreditBalance(this.context, request);
    }

    async searchInfo(request: SearchInfoRequest): Promise<SearchInfoResponse> {
        return searchInfo(this.context, request);
    }

    async searchStockInfo(request: SearchStockInfoRequest): Promise<SearchStockInfoResponse> {
        return searchStockInfo(this.context, request);
    }

    async fetchAfterHourBalance(request: FetchAfterHourBalanceRequest): Promise<FetchAfterHourBalanceResponse> {
        return fetchAfterHourBalance(this.context, request);
    }

    async fetchBulkTransactionCount(request: FetchBulkTransactionCountRequest): Promise<FetchBulkTransactionCountResponse> {
        return fetchBulkTransactionCount(this.context, request);
    }

    async fetchCreditBalance(request: FetchCreditBalanceRequest): Promise<FetchCreditBalanceResponse> {
        return fetchCreditBalance(this.context, request);
    }

    async inquirePsblOrder(request: InquirePsblOrderRequest): Promise<InquirePsblOrderResponse> {
        return inquirePsblOrder(this.context, request);
    }

    async placeDomesticCashOrder(request: PlaceDomesticCashOrderRequest): Promise<PlaceDomesticCashOrderResponse> {
        return placeDomesticCashOrder(this.context, request);
    }
}
