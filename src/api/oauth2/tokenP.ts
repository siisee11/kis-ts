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
