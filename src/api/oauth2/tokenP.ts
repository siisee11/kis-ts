import type { AxiosInstance } from "axios";
import { TOKEN_PATH } from "../../config/constants";
import { KisError, toKisError } from "../../errors";
import {
    type KisRawAuthToken,
    normalizeAuthToken,
} from "../../normalizers";
import type {
    KisAuthRequest,
    KisAuthToken,
    KisCredentials,
} from "../../types";

const JSON_HEADERS = {
    "Content-Type": "application/json",
    Accept: "text/plain",
    charset: "UTF-8",
};

/**
 * 접근토큰발급(P) [인증-001]
 *
 * 본인 계좌에 필요한 인증 절차로, 인증을 통해 접근 토큰을 부여받아 오픈API 활용이 가능합니다.
 * 1. 접근토큰(access_token)의 유효기간은 24시간 이며(1일 1회발급 원칙) 갱신발급주기는 6시간 입니다.(6시간 이내는 기존 발급키로 응답)
 * 2. 접근토큰발급(/oauth2/tokenP) 시 접근토큰값(access_token)과 함께 수신되는 접근토큰 유효기간(acess_token_token_expired)을 이용해 접근토큰을 관리하실 수 있습니다.
 * 
 * @see https://apiportal.koreainvestment.com/apiservice-apiservice?/oauth2/tokenP
 *
 * @param http - Axios Instance
 * @param credentials - KIS Credentials (appKey, appSecret)
 * @param request - Authentication Request Details (grant_type)
 * @returns Access Token Information
 */
export const requestAccessToken = async (
    http: AxiosInstance,
    credentials: KisCredentials,
    request: KisAuthRequest = {},
): Promise<KisAuthToken> => {
    const grantType = request.grantType?.trim() || "client_credentials";
    if (!grantType) {
        throw new KisError("grant_type is required (e.g. client_credentials).");
    }

    const payload = {
        grant_type: grantType,
        appkey: credentials.appKey,
        appsecret: credentials.appSecret,
    };

    try {
        const response = await http.post<KisRawAuthToken>(TOKEN_PATH, payload, {
            headers: JSON_HEADERS,
        });
        return normalizeAuthToken(response.data);
    } catch (error) {
        throw toKisError(error, "Failed to fetch KIS access token.");
    }
};
