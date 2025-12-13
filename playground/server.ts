import { serve } from "@hono/node-server";
import { createKisClient, KisError, type KisEnvironment } from "@jasset/kis";
import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ContentfulStatusCode } from "hono/utils/http-status";

const app = new Hono().basePath("/api");

app.use("*", cors());

type AuthPayload = {
  appKey?: string;
  appSecret?: string;
  env?: KisEnvironment;
};

type BalancePayload = AuthPayload & {
  accessToken: string;
  cano: string;
  acntPrdtCd: string;
  ovrsExcgCd: string;
  trCrcyCd: string;
};

type OrderPayload = AuthPayload & {
  accessToken: string;
  cano: string;
  acntPrdtCd: string;
  ovrsExcgCd:
  | "NASD"
  | "NYSE"
  | "AMEX"
  | "SEHK"
  | "SHAA"
  | "SZAA"
  | "TKSE"
  | "HASE"
  | "VNSE";
  pdno: string;
  ordQty: string;
  ovrsOrdUnpr: string;
  ordDv: "buy" | "sell";
  ordDvsn: string;
};

type HolidayPayload = AuthPayload & {
  accessToken: string;
  bassDt: string;
};

type PricePayload = AuthPayload & {
  accessToken: string;
  excd: string;
  symb: string;
};

type SearchPayload = AuthPayload & {
  accessToken: string;
  excd: string;
  keyword: string;
};

type DomesticSearchPayload = AuthPayload & {
  accessToken: string;
  pdno: string;
  prdtTypeCd: string;
};

app.get("/health", (c) => c.json({ ok: true }));

app.post("/auth/token", async (c) => {
  const body = (await c.req.json()) as AuthPayload;
  const appKey = body.appKey?.trim();
  const appSecret = body.appSecret?.trim();
  const env = body.env ?? "demo";

  if (!appKey || !appSecret) {
    return c.json({ error: "App key and secret are required." }, 400);
  }

  const client = createKisClient({ appKey, appSecret, env });
  try {
    const result = await client.getAccessToken();
    return c.json({ token: result });
  } catch (error) {
    const status =
      error instanceof KisError && error.status ? error.status : 500;
    const message =
      error instanceof Error ? error.message : "Failed to get access token.";
    return c.json({ error: message }, status as ContentfulStatusCode);
  }
});

app.post("/overseas/balance", async (c) => {
  const body = (await c.req.json()) as BalancePayload;
  const appKey = body.appKey?.trim();
  const appSecret = body.appSecret?.trim();
  const accessToken = body.accessToken?.trim();
  const env = body.env ?? "demo";

  if (!appKey || !appSecret) {
    return c.json({ error: "App key and secret are required." }, 400);
  }

  if (!accessToken) {
    return c.json({ error: "Access token is required." }, 400);
  }

  const client = createKisClient({ appKey, appSecret, env });
  client.setAccessToken(accessToken);

  try {
    const result = await client.overseas.inquireOverseasBalance({
      cano: body.cano,
      acntPrdtCd: body.acntPrdtCd,
      ovrsExcgCd: body.ovrsExcgCd,
      trCrcyCd: body.trCrcyCd,
    });
    return c.json({ balance: result });
  } catch (error) {
    const status =
      error instanceof KisError && error.status ? error.status : 500;
    const message =
      error instanceof Error ? error.message : "Failed to fetch balance.";
    return c.json({ error: message }, status as ContentfulStatusCode);
  }
});

app.post("/overseas/order", async (c) => {
  const body = (await c.req.json()) as OrderPayload;
  const appKey = body.appKey?.trim();
  const appSecret = body.appSecret?.trim();
  const accessToken = body.accessToken?.trim();
  const env = body.env ?? "demo";

  if (!appKey || !appSecret) {
    return c.json({ error: "App key and secret are required." }, 400);
  }

  if (!accessToken) {
    return c.json({ error: "Access token is required." }, 400);
  }

  const client = createKisClient({ appKey, appSecret, env });
  client.setAccessToken(accessToken);

  try {
    const result = await client.overseas.placeOverseasOrder({
      cano: body.cano,
      acntPrdtCd: body.acntPrdtCd,
      ovrsExcgCd: body.ovrsExcgCd,
      pdno: body.pdno,
      ordQty: body.ordQty,
      ovrsOrdUnpr: body.ovrsOrdUnpr,
      ordDv: body.ordDv,
      ordDvsn: body.ordDvsn,
    });
    return c.json({ order: result });
  } catch (error) {
    const status =
      error instanceof KisError && error.status ? error.status : 500;
    const message =
      error instanceof Error ? error.message : "Failed to place order.";
    return c.json({ error: message }, status as ContentfulStatusCode);
  }
});

app.post("/domestic/holiday", async (c) => {
  const body = (await c.req.json()) as HolidayPayload;
  const appKey = body.appKey?.trim();
  const appSecret = body.appSecret?.trim();
  const accessToken = body.accessToken?.trim();

  if (!appKey || !appSecret) {
    return c.json({ error: "App key and secret are required." }, 400);
  }

  if (!accessToken) {
    return c.json({ error: "Access token is required." }, 400);
  }

  const client = createKisClient({ appKey, appSecret, env: "real" });
  client.setAccessToken(accessToken);

  try {
    const result = await client.domestic.checkHoliday({
      bassDt: body.bassDt,
    });
    return c.json({ holidays: result });
  } catch (error) {
    const status =
      error instanceof KisError && error.status ? error.status : 500;
    const message =
      error instanceof Error ? error.message : "Failed to check holidays.";
    return c.json({ error: message }, status as ContentfulStatusCode);
  }
});

app.post("/overseas/price", async (c) => {
  const body = (await c.req.json()) as PricePayload;
  const appKey = body.appKey?.trim();
  const appSecret = body.appSecret?.trim();
  const accessToken = body.accessToken?.trim();

  if (!appKey || !appSecret) {
    return c.json({ error: "App key and secret are required." }, 400);
  }

  if (!accessToken) {
    return c.json({ error: "Access token is required." }, 400);
  }

  if (!body.symb?.trim()) {
    return c.json({ error: "Symbol is required." }, 400);
  }

  const client = createKisClient({ appKey, appSecret, env: "real" });
  client.setAccessToken(accessToken);

  try {
    const result = await client.overseas.fetchOverseasPrice({
      excd: body.excd,
      symb: body.symb.trim().toUpperCase(),
    });
    return c.json({ price: result });
  } catch (error) {
    const status =
      error instanceof KisError && error.status ? error.status : 500;
    const message =
      error instanceof Error ? error.message : "Failed to fetch stock price.";
    return c.json({ error: message }, status as ContentfulStatusCode);
  }
});

app.post("/overseas/daily-price", async (c) => {
  const body = (await c.req.json()) as PricePayload;
  const appKey = body.appKey?.trim();
  const appSecret = body.appSecret?.trim();
  const accessToken = body.accessToken?.trim();

  if (!appKey || !appSecret) {
    return c.json({ error: "App key and secret are required." }, 400);
  }

  if (!accessToken) {
    return c.json({ error: "Access token is required." }, 400);
  }

  if (!body.symb?.trim()) {
    return c.json({ error: "Symbol is required." }, 400);
  }

  const client = createKisClient({ appKey, appSecret, env: "real" });
  client.setAccessToken(accessToken);

  try {
    const result = await client.overseas.fetchOverseasDailyPrice({
      excd: body.excd,
      symb: body.symb.trim().toUpperCase(),
      gubn: "0",
    });
    return c.json({ dailyPrice: result });
  } catch (error) {
    const status =
      error instanceof KisError && error.status ? error.status : 500;
    const message =
      error instanceof Error ? error.message : "Failed to fetch daily price.";
    return c.json({ error: message }, status as ContentfulStatusCode);
  }
});

app.post("/overseas/search", async (c) => {
  const body = (await c.req.json()) as SearchPayload;
  const appKey = body.appKey?.trim();
  const appSecret = body.appSecret?.trim();
  const accessToken = body.accessToken?.trim();

  if (!appKey || !appSecret) {
    return c.json({ error: "App key and secret are required." }, 400);
  }

  if (!accessToken) {
    return c.json({ error: "Access token is required." }, 400);
  }

  const client = createKisClient({ appKey, appSecret, env: "real" });
  client.setAccessToken(accessToken);

  try {
    const result = await client.overseas.searchOverseasStock({
      prdtTypeCd: "512",
      pdno: body.keyword?.trim() ?? "",
    });
    return c.json({ search: result });
  } catch (error) {
    const status =
      error instanceof KisError && error.status ? error.status : 500;
    const message =
      error instanceof Error ? error.message : "Failed to search stocks.";
    return c.json({ error: message }, status as ContentfulStatusCode);
  }
});

app.post("/domestic/search-info", async (c) => {
  const body = (await c.req.json()) as DomesticSearchPayload;
  const appKey = body.appKey?.trim();
  const appSecret = body.appSecret?.trim();
  const accessToken = body.accessToken?.trim();

  if (!appKey || !appSecret) {
    return c.json({ error: "App key and secret are required." }, 400);
  }

  if (!accessToken) {
    return c.json({ error: "Access token is required." }, 400);
  }

  if (!body.pdno?.trim()) {
    return c.json({ error: "pdno (상품번호) is required." }, 400);
  }

  const client = createKisClient({ appKey, appSecret, env: "real" });
  client.setAccessToken(accessToken);

  try {
    const result = await client.domestic.searchInfo({
      pdno: body.pdno.trim(),
      prdtTypeCd: body.prdtTypeCd ?? "300",
    });
    return c.json({ info: result });
  } catch (error) {
    const status =
      error instanceof KisError && error.status ? error.status : 500;
    const message =
      error instanceof Error ? error.message : "Failed to search stock info.";
    return c.json({ error: message }, status as ContentfulStatusCode);
  }
});

app.post("/domestic/search-stock-info", async (c) => {
  const body = (await c.req.json()) as DomesticSearchPayload;
  const appKey = body.appKey?.trim();
  const appSecret = body.appSecret?.trim();
  const accessToken = body.accessToken?.trim();

  if (!appKey || !appSecret) {
    return c.json({ error: "App key and secret are required." }, 400);
  }

  if (!accessToken) {
    return c.json({ error: "Access token is required." }, 400);
  }

  if (!body.pdno?.trim()) {
    return c.json({ error: "pdno (종목번호) is required." }, 400);
  }

  const client = createKisClient({ appKey, appSecret, env: "real" });
  client.setAccessToken(accessToken);

  try {
    const result = await client.domestic.searchStockInfo({
      prdtTypeCd: body.prdtTypeCd ?? "300",
      pdno: body.pdno.trim(),
    });
    return c.json({ stockInfo: result });
  } catch (error) {
    const status =
      error instanceof KisError && error.status ? error.status : 500;
    const message =
      error instanceof Error ? error.message : "Failed to search stock info.";
    return c.json({ error: message }, status as ContentfulStatusCode);
  }
});

const port = Number(process.env.KIS_PLAYGROUND_PORT ?? 8788);

serve(
  {
    port,
    fetch: app.fetch,
  },
  () => {
    console.log(`KIS playground API ready on http://localhost:${port}/api`);
  },
);
