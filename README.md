
[KOR](README-KO.md)

# @jasset/kis

[![npm version](https://img.shields.io/npm/v/@jasset/kis.svg)](https://www.npmjs.com/package/@jasset/kis)

Typescript client for KIS API(KoreaInvestment OpenAPI).

## Installation

```bash
npm install @jasset/kis
```

## How to use

```typescript
import { createKisClient } from "@jasset/kis";

async function main() {
  const client = createKisClient({
    appKey: process.env.KIS_APP_KEY,
    appSecret: process.env.KIS_APP_SECRET,
    env: "demo", // or 'real'
  });

  // 1. (Optional) Get Access Token manually
  // The client will automatically fetch and reuse the token if not set.
  // const { access_token } = await client.getAccessToken();
  // client.setAccessToken(access_token);

  // 2. Call API (e.g. Check Domestic Holiday)
  // Token is automatically handled!
  // New: APIs are organized under namespaces
  const result = await client.domestic.checkHoliday({
    bassDt: "20231225",
  });
  
  console.log(result.holidays);
}
main();
```

## Features

- **Typed Request/Response**: All request and response bodies are fully typed.
- **Auto Pagination**: Automatically fetch all pages for paginated APIs (can be disabled).
- **Environment Support**: Easy switch between Real and Demo environments.
- **Client Methods**: APIs accessible via `client.domestic` and `client.overseas`.

## API Status

### Domestic Stock
| Type | Name | Method | Path | Status |
| :--- | :--- | :--- | :--- | :--- |
| REST | 국내휴장일조회 | GET | /uapi/domestic-stock/v1/quotations/chk-holiday | ✅ |
| REST | 주식기본조회 | GET | /uapi/domestic-stock/v1/quotations/search-stock-info | ✅ |
| ... | ... | ... | ... | ... |

[(See full list in docs or type definitions)](./IMPLEMENTATION_STATUS.md)


## Playground

playground is demo client and server for example.