
import { KisClient } from "./index";
import {
    captureUplowprice,
    type CaptureUplowpriceRequest,
    type CaptureUplowpriceResponse,
} from "../api/domestic/quotations/capture-uplowprice";
import {
    checkHoliday,
    type CheckHolidayRequest,
    type CheckHolidayResponse,
} from "../api/domestic/quotations/check-holiday";
import {
    fetchDailyCreditBalance,
    type DailyCreditBalanceRequest,
    type DailyCreditBalanceResponse,
} from "../api/domestic/quotations/daily-credit-balance";
import {
    searchInfo,
    type SearchInfoRequest,
    type SearchInfoResponse,
} from "../api/domestic/quotations/search-info";
import {
    searchStockInfo,
    type SearchStockInfoRequest,
    type SearchStockInfoResponse,
} from "../api/domestic/quotations/search-stock-info";
import {
    fetchAfterHourBalance,
    type FetchAfterHourBalanceRequest,
    type FetchAfterHourBalanceResponse,
} from "../api/domestic/ranking/after-hour-balance";
import {
    fetchBulkTransactionCount,
    type FetchBulkTransactionCountRequest,
    type FetchBulkTransactionCountResponse,
} from "../api/domestic/ranking/bulk-transaction-count";
import {
    fetchCreditBalance,
    type FetchCreditBalanceRequest,
    type FetchCreditBalanceResponse,
} from "../api/domestic/ranking/credit-balance";
import {
    inquirePsblOrder,
    type InquirePsblOrderRequest,
    type InquirePsblOrderResponse,
} from "../api/domestic/trading/inquire-psbl-order";
import {
    placeDomesticCashOrder,
    type PlaceDomesticCashOrderRequest,
    type PlaceDomesticCashOrderResponse,
} from "../api/domestic/trading/order-cash";

/**
 * Client for Domestic Stock APIs.
 */
export class KisDomesticClient {
    constructor(private client: KisClient) { }

    private async getContext() {
        const token = await this.client.ensureAccessToken();
        return this.client.getContext(token);
    }

    /**
     * Captures the upper and lower price limits for a domestic stock.
     *
     * @param {CaptureUplowpriceRequest} request - The request parameters.
     * @returns {Promise<CaptureUplowpriceResponse>} The price limits.
     */
    async captureUplowprice(request: CaptureUplowpriceRequest): Promise<CaptureUplowpriceResponse> {
        return captureUplowprice(await this.getContext(), request);
    }

    /**
     * Checks if a specific date is a holiday.
     *
     * @param {CheckHolidayRequest} request - The request parameters (date).
     * @returns {Promise<CheckHolidayResponse>} The holiday check result.
     */
    async checkHoliday(request: CheckHolidayRequest): Promise<CheckHolidayResponse> {
        return checkHoliday(await this.getContext(), request);
    }

    /**
     * Fetches daily credit balance trend for domestic stocks.
     *
     * @param {DailyCreditBalanceRequest} request - The request parameters.
     * @returns {Promise<DailyCreditBalanceResponse>} The daily credit balance data.
     */
    async fetchDailyCreditBalance(request: DailyCreditBalanceRequest): Promise<DailyCreditBalanceResponse> {
        return fetchDailyCreditBalance(await this.getContext(), request);
    }

    /**
     * Searches for general information about a domestic stock.
     *
     * @param {SearchInfoRequest} request - The request parameters (e.g., product number).
     * @returns {Promise<SearchInfoResponse>} The stock information.
     */
    async searchInfo(request: SearchInfoRequest): Promise<SearchInfoResponse> {
        return searchInfo(await this.getContext(), request);
    }

    /**
     * Searches for detailed stock information.
     *
     * @param {SearchStockInfoRequest} request - The request parameters.
     * @returns {Promise<SearchStockInfoResponse>} The detailed stock info.
     */
    async searchStockInfo(request: SearchStockInfoRequest): Promise<SearchStockInfoResponse> {
        return searchStockInfo(await this.getContext(), request);
    }

    /**
     * Fetches after-hour balance ranking.
     *
     * @param {FetchAfterHourBalanceRequest} request - The request parameters.
     * @returns {Promise<FetchAfterHourBalanceResponse>} The ranking data.
     */
    async fetchAfterHourBalance(request: FetchAfterHourBalanceRequest): Promise<FetchAfterHourBalanceResponse> {
        return fetchAfterHourBalance(await this.getContext(), request);
    }

    /**
     * Fetches bulk transaction count ranking.
     *
     * @param {FetchBulkTransactionCountRequest} request - The request parameters.
     * @returns {Promise<FetchBulkTransactionCountResponse>} The ranking data.
     */
    async fetchBulkTransactionCount(request: FetchBulkTransactionCountRequest): Promise<FetchBulkTransactionCountResponse> {
        return fetchBulkTransactionCount(await this.getContext(), request);
    }

    /**
     * Fetches credit balance ranking.
     *
     * @param {FetchCreditBalanceRequest} request - The request parameters.
     * @returns {Promise<FetchCreditBalanceResponse>} The credit balance ranking.
     */
    async fetchCreditBalance(request: FetchCreditBalanceRequest): Promise<FetchCreditBalanceResponse> {
        return fetchCreditBalance(await this.getContext(), request);
    }

    /**
     * Inquires about possible order quantity and amount.
     *
     * @param {InquirePsblOrderRequest} request - The request parameters.
     * @returns {Promise<InquirePsblOrderResponse>} The possible order details.
     */
    async inquirePsblOrder(request: InquirePsblOrderRequest): Promise<InquirePsblOrderResponse> {
        return inquirePsblOrder(await this.getContext(), request);
    }

    /**
     * Places a cash order for a domestic stock.
     *
     * @param {PlaceDomesticCashOrderRequest} request - The order parameters.
     * @returns {Promise<PlaceDomesticCashOrderResponse>} The order result.
     */
    async placeDomesticCashOrder(request: PlaceDomesticCashOrderRequest): Promise<PlaceDomesticCashOrderResponse> {
        return placeDomesticCashOrder(await this.getContext(), request);
    }
}
