import { useEffect, useState } from "react";

type Environment = "demo" | "real";
type TabType = "auth" | "price" | "domestic" | "balance" | "order" | "holiday";

type TokenResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

const STORAGE_KEY = "kis-playground:credentials";
const API_BASE = import.meta.env.VITE_KIS_API_BASE ?? "/api";

const mask = (value: string) =>
  value.length > 10 ? `${value.slice(0, 4)}••••••••${value.slice(-4)}` : value;

function App() {
  const [appKey, setAppKey] = useState("");
  const [appSecret, setAppSecret] = useState("");
  const [env, setEnv] = useState<Environment>("demo");
  const [accessToken, setAccessToken] = useState("");
  const [tokenExpiry, setTokenExpiry] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("auth");

  // Account info
  const [cano, setCano] = useState("");
  const [acntPrdtCd, setAcntPrdtCd] = useState("01");

  // Balance form
  const [ovrsExcgCd, setOvrsExcgCd] = useState("NASD");
  const [trCrcyCd, setTrCrcyCd] = useState("USD");

  // Order form
  const [pdno, setPdno] = useState("");
  const [ordQty, setOrdQty] = useState("");
  const [ordUnpr, setOrdUnpr] = useState("");
  const [ordDv, setOrdDv] = useState<"buy" | "sell">("buy");
  const [ordDvsn, setOrdDvsn] = useState("00");

  // Holiday form
  const [bassDt, setBassDt] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0].replace(/-/g, "");
  });

  // Price form
  const [priceSymbol, setPriceSymbol] = useState("");
  const [priceExcd, setPriceExcd] = useState("NAS");
  const [searchKeyword, setSearchKeyword] = useState("");

  // Domestic stock search form
  const [domesticPdno, setDomesticPdno] = useState("");
  const [domesticPrdtTypeCd, setDomesticPrdtTypeCd] = useState("300");

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [lastRequest, setLastRequest] = useState<unknown>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as {
        appKey?: string;
        appSecret?: string;
        cano?: string;
        acntPrdtCd?: string;
        env?: Environment;
        accessToken?: string;
        tokenExpiry?: number;
      };
      setAppKey(parsed.appKey ?? "");
      setAppSecret(parsed.appSecret ?? "");
      setCano(parsed.cano ?? "");
      setAcntPrdtCd(parsed.acntPrdtCd ?? "01");
      setEnv(parsed.env ?? "demo");
      if (
        parsed.accessToken &&
        parsed.tokenExpiry &&
        Date.now() < parsed.tokenExpiry
      ) {
        setAccessToken(parsed.accessToken);
        setTokenExpiry(parsed.tokenExpiry);
        setToast("Credentials and token restored from local storage.");
      } else {
        setToast("Credentials restored from local storage.");
      }
    } catch {
      // ignore parse failure
    }
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const rememberLocally = () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        appKey,
        appSecret,
        cano,
        acntPrdtCd,
        env,
        accessToken,
        tokenExpiry,
      }),
    );
    setToast("Saved to browser. Keys never leave this page.");
  };

  const clearStored = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setAppKey("");
    setAppSecret("");
    setCano("");
    setAccessToken("");
    setTokenExpiry(null);
    setToast("Cleared stored credentials.");
  };

  const handleGetToken = async () => {
    setError(null);
    setResponse(null);
    setLastRequest(null);

    if (!appKey.trim() || !appSecret.trim()) {
      setError("Provide both App Key and App Secret.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        appKey: appKey.trim(),
        appSecret: appSecret.trim(),
        env,
      };
      setLastRequest({ ...payload, appSecret: mask(appSecret) });

      const res = await fetch(`${API_BASE}/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as
        | { token: TokenResponse }
        | { error?: string };

      if (!res.ok || !("token" in data)) {
        throw new Error(
          "error" in data && data.error ? data.error : "Failed to get token.",
        );
      }

      const newExpiry = Date.now() + data.token.expiresIn * 1000;
      setAccessToken(data.token.accessToken);
      setTokenExpiry(newExpiry);
      setResponse(data);
      // Auto-save token to localStorage
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              ...parsed,
              accessToken: data.token.accessToken,
              tokenExpiry: newExpiry,
            }),
          );
        } catch {
          // ignore
        }
      }
      setToast("Access token acquired successfully!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to get token.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFetchBalance = async () => {
    setError(null);
    setResponse(null);
    setLastRequest(null);

    if (!accessToken) {
      setError("Get an access token first.");
      return;
    }

    if (!cano.trim()) {
      setError("Account number (CANO) is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        appKey: appKey.trim(),
        appSecret: appSecret.trim(),
        accessToken,
        env,
        cano: cano.trim(),
        acntPrdtCd: acntPrdtCd.trim(),
        ovrsExcgCd,
        trCrcyCd,
      };
      setLastRequest({
        ...payload,
        appSecret: mask(appSecret),
        accessToken: mask(accessToken),
      });

      const res = await fetch(`${API_BASE}/overseas/balance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { balance?: unknown; error?: string };

      if (!res.ok || !("balance" in data)) {
        throw new Error(data.error ?? "Failed to fetch balance.");
      }

      setResponse(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch balance.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlaceOrder = async () => {
    setError(null);
    setResponse(null);
    setLastRequest(null);

    if (!accessToken) {
      setError("Get an access token first.");
      return;
    }

    if (!cano.trim() || !pdno.trim() || !ordQty.trim() || !ordUnpr.trim()) {
      setError("Fill in all required fields: CANO, Symbol, Quantity, Price.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        appKey: appKey.trim(),
        appSecret: appSecret.trim(),
        accessToken,
        env,
        cano: cano.trim(),
        acntPrdtCd: acntPrdtCd.trim(),
        ovrsExcgCd,
        pdno: pdno.trim().toUpperCase(),
        ordQty: ordQty.trim(),
        ovrsOrdUnpr: ordUnpr.trim(),
        ordDv,
        ordDvsn,
      };
      setLastRequest({
        ...payload,
        appSecret: mask(appSecret),
        accessToken: mask(accessToken),
      });

      const res = await fetch(`${API_BASE}/overseas/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { order?: unknown; error?: string };

      if (!res.ok || !("order" in data)) {
        throw new Error(data.error ?? "Failed to place order.");
      }

      setResponse(data);
      setToast("Order placed successfully!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to place order.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckHoliday = async () => {
    setError(null);
    setResponse(null);
    setLastRequest(null);

    if (!accessToken) {
      setError("Get an access token first.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        appKey: appKey.trim(),
        appSecret: appSecret.trim(),
        accessToken,
        bassDt: bassDt.trim(),
      };
      setLastRequest({
        ...payload,
        appSecret: mask(appSecret),
        accessToken: mask(accessToken),
      });

      const res = await fetch(`${API_BASE}/domestic/holiday`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { holidays?: unknown; error?: string };

      if (!res.ok || !("holidays" in data)) {
        throw new Error(data.error ?? "Failed to check holidays.");
      }

      setResponse(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to check holidays.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFetchPrice = async () => {
    setError(null);
    setResponse(null);
    setLastRequest(null);

    if (!accessToken) {
      setError("Get an access token first.");
      return;
    }

    if (!priceSymbol.trim()) {
      setError("Symbol is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        appKey: appKey.trim(),
        appSecret: appSecret.trim(),
        accessToken,
        excd: priceExcd,
        symb: priceSymbol.trim().toUpperCase(),
      };
      setLastRequest({
        ...payload,
        appSecret: mask(appSecret),
        accessToken: mask(accessToken),
      });

      const res = await fetch(`${API_BASE}/overseas/price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { price?: unknown; error?: string };

      if (!res.ok || !("price" in data)) {
        throw new Error(data.error ?? "Failed to fetch price.");
      }

      setResponse(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch price.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFetchDailyPrice = async () => {
    setError(null);
    setResponse(null);
    setLastRequest(null);

    if (!accessToken) {
      setError("Get an access token first.");
      return;
    }

    if (!priceSymbol.trim()) {
      setError("Symbol is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        appKey: appKey.trim(),
        appSecret: appSecret.trim(),
        accessToken,
        excd: priceExcd,
        symb: priceSymbol.trim().toUpperCase(),
      };
      setLastRequest({
        ...payload,
        appSecret: mask(appSecret),
        accessToken: mask(accessToken),
      });

      const res = await fetch(`${API_BASE}/overseas/daily-price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as {
        dailyPrice?: unknown;
        error?: string;
      };

      if (!res.ok || !("dailyPrice" in data)) {
        throw new Error(data.error ?? "Failed to fetch daily price.");
      }

      setResponse(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch daily price.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearchStock = async () => {
    setError(null);
    setResponse(null);
    setLastRequest(null);

    if (!accessToken) {
      setError("Get an access token first.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        appKey: appKey.trim(),
        appSecret: appSecret.trim(),
        accessToken,
        excd: priceExcd,
        keyword: searchKeyword.trim(),
      };
      setLastRequest({
        ...payload,
        appSecret: mask(appSecret),
        accessToken: mask(accessToken),
      });

      const res = await fetch(`${API_BASE}/overseas/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { search?: unknown; error?: string };

      if (!res.ok || !("search" in data)) {
        throw new Error(data.error ?? "Failed to search stocks.");
      }

      setResponse(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to search stocks.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDomesticSearchInfo = async () => {
    setError(null);
    setResponse(null);
    setLastRequest(null);

    if (!accessToken) {
      setError("Get an access token first.");
      return;
    }

    if (!domesticPdno.trim()) {
      setError("상품번호 (PDNO) is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        appKey: appKey.trim(),
        appSecret: appSecret.trim(),
        accessToken,
        pdno: domesticPdno.trim(),
        prdtTypeCd: domesticPrdtTypeCd,
      };
      setLastRequest({
        ...payload,
        appSecret: mask(appSecret),
        accessToken: mask(accessToken),
      });

      const res = await fetch(`${API_BASE}/domestic/search-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { info?: unknown; error?: string };

      if (!res.ok || !("info" in data)) {
        throw new Error(data.error ?? "Failed to search stock info.");
      }

      setResponse(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to search stock info.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDomesticSearchStockInfo = async () => {
    setError(null);
    setResponse(null);
    setLastRequest(null);

    if (!accessToken) {
      setError("Get an access token first.");
      return;
    }

    if (!domesticPdno.trim()) {
      setError("종목번호 (PDNO) is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        appKey: appKey.trim(),
        appSecret: appSecret.trim(),
        accessToken,
        pdno: domesticPdno.trim(),
        prdtTypeCd: domesticPrdtTypeCd,
      };
      setLastRequest({
        ...payload,
        appSecret: mask(appSecret),
        accessToken: mask(accessToken),
      });

      const res = await fetch(`${API_BASE}/domestic/search-stock-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as {
        stockInfo?: unknown;
        error?: string;
      };

      if (!res.ok || !("stockInfo" in data)) {
        throw new Error(data.error ?? "Failed to search stock info.");
      }

      setResponse(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to search stock info.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTokenValid = accessToken && tokenExpiry && Date.now() < tokenExpiry;

  return (
    <div className="page">
      <div className="hero">
        <div>
          <div className="badge">Korea Investment & Securities</div>
          <h1>KIS API Playground</h1>
          <p>
            Test @jasset/kis package APIs. Keys stay local; requests go through
            a local proxy to KIS servers.
          </p>
        </div>
        <div className="stack">
          <button className="subtle" type="button" onClick={rememberLocally}>
            Remember locally
          </button>
          <button className="subtle" type="button" onClick={clearStored}>
            Clear keys
          </button>
        </div>
      </div>

      {toast && <div className="alert info">{toast}</div>}

      <div className="tabs">
        <button
          type="button"
          className={`tab ${activeTab === "auth" ? "active" : ""}`}
          onClick={() => setActiveTab("auth")}
        >
          🔐 Auth
        </button>
        <button
          type="button"
          className={`tab ${activeTab === "price" ? "active" : ""}`}
          onClick={() => setActiveTab("price")}
        >
          💹 Overseas
        </button>
        <button
          type="button"
          className={`tab ${activeTab === "domestic" ? "active" : ""}`}
          onClick={() => setActiveTab("domestic")}
        >
          🇰🇷 Domestic
        </button>
        <button
          type="button"
          className={`tab ${activeTab === "balance" ? "active" : ""}`}
          onClick={() => setActiveTab("balance")}
        >
          💰 Balance
        </button>
        <button
          type="button"
          className={`tab ${activeTab === "order" ? "active" : ""}`}
          onClick={() => setActiveTab("order")}
        >
          📈 Order
        </button>
        <button
          type="button"
          className={`tab ${activeTab === "holiday" ? "active" : ""}`}
          onClick={() => setActiveTab("holiday")}
        >
          📅 Holiday
        </button>
      </div>

      <div className="grid">
        {/* Credentials Card - Always visible */}
        <div className="card">
          <h2>API Credentials</h2>
          <p className="muted">
            Get your keys from{" "}
            <a
              href="https://apiportal.koreainvestment.com"
              target="_blank"
              rel="noreferrer"
            >
              KIS Open API Portal
            </a>
          </p>
          <div className="form-grid">
            <label>
              App Key
              <input
                value={appKey}
                onChange={(e) => setAppKey(e.target.value)}
                placeholder="Your KIS App Key"
                autoComplete="off"
              />
            </label>
            <label>
              App Secret
              <input
                type="password"
                value={appSecret}
                onChange={(e) => setAppSecret(e.target.value)}
                placeholder="Your KIS App Secret"
                autoComplete="off"
              />
            </label>
            <label>
              Environment
              <select
                value={env}
                onChange={(e) => setEnv(e.target.value as Environment)}
              >
                <option value="demo">Demo (모의투자)</option>
                <option value="real">Real (실전투자)</option>
              </select>
            </label>
            <label>
              Account No. (CANO)
              <input
                value={cano}
                onChange={(e) => setCano(e.target.value)}
                placeholder="계좌번호 8자리"
                maxLength={8}
              />
            </label>
          </div>
          {isTokenValid && (
            <div className="token-display">
              <span className="label">Token</span>
              <span className="value">{mask(accessToken)}</span>
              <span className={`badge ${env}`}>{env}</span>
            </div>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === "auth" && (
          <div className="card">
            <h2>Get Access Token</h2>
            <p className="muted">
              Request an OAuth access token from KIS API. Tokens are valid for
              24 hours.
            </p>
            <ul className="hint-list">
              <li>
                Demo environment uses <code>모의투자</code> credentials
              </li>
              <li>
                Real environment uses <code>실전투자</code> credentials
              </li>
              <li>Token expires after ~24 hours</li>
            </ul>
            <div className="row" style={{ marginTop: 16 }}>
              <button
                type="button"
                onClick={handleGetToken}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Requesting…" : "Get Token"}
              </button>
            </div>
            {error && <div className="alert error">{error}</div>}
          </div>
        )}

        {activeTab === "price" && (
          <div className="card">
            <h2>Overseas Stock Price</h2>
            <p className="muted">
              Get real-time and historical prices for overseas stocks.
            </p>
            <div className="form-grid">
              <label>
                Symbol
                <input
                  value={priceSymbol}
                  onChange={(e) => setPriceSymbol(e.target.value)}
                  placeholder="AAPL, TSLA, NVDA..."
                />
              </label>
              <label>
                Exchange
                <select
                  value={priceExcd}
                  onChange={(e) => setPriceExcd(e.target.value)}
                >
                  <option value="NAS">NASDAQ</option>
                  <option value="NYS">NYSE</option>
                  <option value="AMS">AMEX</option>
                  <option value="HKS">Hong Kong</option>
                  <option value="SHS">Shanghai</option>
                  <option value="SZS">Shenzhen</option>
                  <option value="TSE">Tokyo</option>
                  <option value="HNX">Vietnam (Hanoi)</option>
                  <option value="HSX">Vietnam (Ho Chi Minh)</option>
                </select>
              </label>
            </div>
            <div className="row" style={{ marginTop: 16 }}>
              <button
                type="button"
                onClick={handleFetchPrice}
                disabled={isSubmitting || !isTokenValid}
              >
                {isSubmitting ? "Fetching…" : "Get Current Price"}
              </button>
              <button
                type="button"
                className="subtle"
                onClick={handleFetchDailyPrice}
                disabled={isSubmitting || !isTokenValid}
              >
                {isSubmitting ? "Fetching…" : "Get Daily History"}
              </button>
            </div>
            {!isTokenValid && (
              <div className="alert info">
                Get an access token first in the Auth tab.
              </div>
            )}
            {error && <div className="alert error">{error}</div>}

            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid var(--border)",
              }}
            >
              <h3 style={{ margin: "0 0 8px", fontSize: 15 }}>Search Stocks</h3>
              <p className="muted">Find stock symbols by keyword.</p>
              <div className="form-grid">
                <label>
                  Keyword
                  <input
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="apple, tesla..."
                  />
                </label>
              </div>
              <div className="row" style={{ marginTop: 12 }}>
                <button
                  type="button"
                  className="subtle"
                  onClick={handleSearchStock}
                  disabled={isSubmitting || !isTokenValid}
                >
                  {isSubmitting ? "Searching…" : "Search"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "domestic" && (
          <div className="card">
            <h2>국내주식 종목정보</h2>
            <p className="muted">국내주식 상품기본조회 및 주식기본조회 API</p>
            <div className="form-grid">
              <label>
                종목번호 (PDNO)
                <input
                  value={domesticPdno}
                  onChange={(e) => setDomesticPdno(e.target.value)}
                  placeholder="000660, 005930..."
                />
              </label>
              <label>
                상품유형코드
                <select
                  value={domesticPrdtTypeCd}
                  onChange={(e) => setDomesticPrdtTypeCd(e.target.value)}
                >
                  <option value="300">300 - 주식/ETF/ETN/ELW</option>
                  <option value="301">301 - 선물옵션</option>
                  <option value="302">302 - 채권</option>
                  <option value="306">306 - ELS</option>
                </select>
              </label>
            </div>
            <div className="row" style={{ marginTop: 16 }}>
              <button
                type="button"
                onClick={handleDomesticSearchInfo}
                disabled={isSubmitting || !isTokenValid}
              >
                {isSubmitting ? "조회중…" : "상품기본조회"}
              </button>
              <button
                type="button"
                className="subtle"
                onClick={handleDomesticSearchStockInfo}
                disabled={isSubmitting || !isTokenValid}
              >
                {isSubmitting ? "조회중…" : "주식기본조회"}
              </button>
            </div>
            {!isTokenValid && (
              <div className="alert info">
                먼저 Auth 탭에서 액세스 토큰을 발급받으세요.
              </div>
            )}
            {error && <div className="alert error">{error}</div>}
            <ul className="hint-list" style={{ marginTop: 16 }}>
              <li>
                <strong>상품기본조회</strong>: 상품 기본 정보 (v1_국내주식-029)
              </li>
              <li>
                <strong>주식기본조회</strong>: 주식 상세 정보 (v1_국내주식-067)
              </li>
              <li>예시: 삼성전자 005930, SK하이닉스 000660</li>
            </ul>
          </div>
        )}

        {activeTab === "balance" && (
          <div className="card">
            <h2>Overseas Balance Inquiry</h2>
            <p className="muted">Fetch overseas stock portfolio balance.</p>
            <div className="form-grid">
              <label>
                Exchange
                <select
                  value={ovrsExcgCd}
                  onChange={(e) => setOvrsExcgCd(e.target.value)}
                >
                  <option value="NASD">NASDAQ</option>
                  <option value="NYSE">NYSE</option>
                  <option value="AMEX">AMEX</option>
                  <option value="SEHK">Hong Kong</option>
                  <option value="SHAA">Shanghai</option>
                  <option value="SZAA">Shenzhen</option>
                  <option value="TKSE">Tokyo</option>
                </select>
              </label>
              <label>
                Currency
                <select
                  value={trCrcyCd}
                  onChange={(e) => setTrCrcyCd(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="HKD">HKD</option>
                  <option value="CNY">CNY</option>
                  <option value="JPY">JPY</option>
                </select>
              </label>
              <label>
                Product Code
                <input
                  value={acntPrdtCd}
                  onChange={(e) => setAcntPrdtCd(e.target.value)}
                  placeholder="01"
                  maxLength={2}
                />
              </label>
            </div>
            <div className="row" style={{ marginTop: 16 }}>
              <button
                type="button"
                onClick={handleFetchBalance}
                disabled={isSubmitting || !isTokenValid}
              >
                {isSubmitting ? "Fetching…" : "Fetch Balance"}
              </button>
            </div>
            {!isTokenValid && (
              <div className="alert info">
                Get an access token first in the Auth tab.
              </div>
            )}
            {error && <div className="alert error">{error}</div>}
          </div>
        )}

        {activeTab === "order" && (
          <div className="card">
            <h2>Place Overseas Order</h2>
            <p className="muted">
              Submit a buy or sell order for overseas stocks.
            </p>
            <div className="form-grid">
              <label>
                Symbol
                <input
                  value={pdno}
                  onChange={(e) => setPdno(e.target.value)}
                  placeholder="AAPL"
                />
              </label>
              <label>
                Exchange
                <select
                  value={ovrsExcgCd}
                  onChange={(e) => setOvrsExcgCd(e.target.value)}
                >
                  <option value="NASD">NASDAQ</option>
                  <option value="NYSE">NYSE</option>
                  <option value="AMEX">AMEX</option>
                  <option value="SEHK">Hong Kong</option>
                  <option value="SHAA">Shanghai</option>
                  <option value="SZAA">Shenzhen</option>
                  <option value="TKSE">Tokyo</option>
                </select>
              </label>
              <label>
                Side
                <select
                  value={ordDv}
                  onChange={(e) => setOrdDv(e.target.value as "buy" | "sell")}
                >
                  <option value="buy">Buy (매수)</option>
                  <option value="sell">Sell (매도)</option>
                </select>
              </label>
              <label>
                Order Type
                <select
                  value={ordDvsn}
                  onChange={(e) => setOrdDvsn(e.target.value)}
                >
                  <option value="00">Limit (지정가)</option>
                  <option value="32">Market (Pre/Post)</option>
                </select>
              </label>
              <label>
                Quantity
                <input
                  type="number"
                  value={ordQty}
                  onChange={(e) => setOrdQty(e.target.value)}
                  placeholder="1"
                  min="1"
                />
              </label>
              <label>
                Price
                <input
                  type="number"
                  step="0.01"
                  value={ordUnpr}
                  onChange={(e) => setOrdUnpr(e.target.value)}
                  placeholder="150.00"
                />
              </label>
            </div>
            <div className="row" style={{ marginTop: 16 }}>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting || !isTokenValid}
              >
                {isSubmitting ? "Placing…" : "Place Order"}
              </button>
            </div>
            {!isTokenValid && (
              <div className="alert info">
                Get an access token first in the Auth tab.
              </div>
            )}
            {error && <div className="alert error">{error}</div>}
            {env === "real" && (
              <div className="alert error" style={{ marginTop: 10 }}>
                ⚠️ You're in REAL mode. Orders will execute with real money!
              </div>
            )}
          </div>
        )}

        {activeTab === "holiday" && (
          <div className="card">
            <h2>Check Market Holidays</h2>
            <p className="muted">
              Query Korean market holidays from a base date.
            </p>
            <div className="form-grid">
              <label>
                Base Date (YYYYMMDD)
                <input
                  value={bassDt}
                  onChange={(e) => setBassDt(e.target.value)}
                  placeholder="20241203"
                  maxLength={8}
                />
              </label>
            </div>
            <div className="row" style={{ marginTop: 16 }}>
              <button
                type="button"
                onClick={handleCheckHoliday}
                disabled={isSubmitting || !isTokenValid}
              >
                {isSubmitting ? "Checking…" : "Check Holidays"}
              </button>
            </div>
            {!isTokenValid && (
              <div className="alert info">
                Get an access token first in the Auth tab.
              </div>
            )}
            {error && <div className="alert error">{error}</div>}
          </div>
        )}

        {/* Response Card */}
        <div className="card full">
          <h2>Response</h2>
          <p className="muted">Raw API response from KIS servers.</p>
          {lastRequest && (
            <>
              <p className="muted" style={{ marginBottom: 8, marginTop: 16 }}>
                Request payload:
              </p>
              <div className="code-block" style={{ marginBottom: 16 }}>
                <pre>{JSON.stringify(lastRequest, null, 2)}</pre>
              </div>
            </>
          )}
          {response ? (
            <div className="code-block">
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          ) : (
            <div className="muted" style={{ marginTop: 12 }}>
              Run a request to see the response here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
