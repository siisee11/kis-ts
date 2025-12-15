import type { AxiosInstance } from "axios";
import { WS_APPROVAL_PATH } from "../../config/constants";
import { KisError, toKisError } from "../../errors";
import type { KisCredentials } from "../../types";

const JSON_HEADERS = {
  "Content-Type": "application/json",
  Accept: "text/plain",
  charset: "UTF-8",
};

// ==============================================================================================
// [WEBSOCKET] 실시간 (웹소켓) 접속키 발급
// [Base URL] /oauth2/Approval
// ==============================================================================================

export type RequestWebsocketApprovalKeyRequest = {
  /**
   * 인증방식
   * client_credentials : 클라이언트 인증방식
   *
   * @default client_credentials
   */
  grant_type?: string;
};

export type RequestWebsocketApprovalKeyResponse = {
  /**
   * 실시간 접속키 (approval_key)
   *
   * 웹소켓 연결 시 헤더(approval_key)에 사용되는 값입니다.
   */
  approval_key: string;
};

/**
 * 실시간 (웹소켓) 접속키 발급
 *
 * 웹소켓 API 사용을 위한 접속키(approval_key)를 발급받습니다.
 * 발급받은 키는 웹소켓 연결 시 헤더에 포함하여 사용합니다.
 *
 * @see https://apiportal.koreainvestment.com/apiservice-apiservice?oauth2/Approval
 *
 * @param http AxiosInstance
 * @param credentials 앱키(appKey)와 앱시크릿(appSecret)
 * @param request 요청 파라미터 (grant_type: client_credentials 등)
 * @returns RequestWebsocketApprovalKeyResponse 발급된 접속키 정보
 */
export const requestWebsocketApprovalKey = async (
  http: AxiosInstance,
  credentials: KisCredentials,
  request: RequestWebsocketApprovalKeyRequest = {},
): Promise<RequestWebsocketApprovalKeyResponse> => {
  const grantType = request.grant_type?.trim() || "client_credentials";
  if (!grantType) {
    throw new KisError("grant_type is required (e.g. client_credentials).");
  }

  const payload: Record<string, string> = {
    grant_type: grantType,
    appkey: credentials.appKey,
    secretkey: credentials.appSecret,
  };

  try {
    const response = await http.post<RequestWebsocketApprovalKeyResponse>(
      WS_APPROVAL_PATH,
      payload,
      { headers: JSON_HEADERS },
    );
    return response.data;
  } catch (error) {
    throw toKisError(error, "Failed to fetch KIS websocket approval key.");
  }
};
