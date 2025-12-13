# @jasset/kis

[![npm version](https://img.shields.io/npm/v/@jasset/kis.svg)](https://www.npmjs.com/package/@jasset/kis)

한국투자증권(KoreaInvestment) OpenAPI를 위한 Typescript 클라이언트입니다.

## 설치

```bash
npm install @jasset/kis
```

## 사용법

```typescript
import { createKisClient } from "@jasset/kis";

async function main() {
  const client = createKisClient({
    appKey: process.env.KIS_APP_KEY,
    appSecret: process.env.KIS_APP_SECRET,
    env: "demo", // 또는 'real'
  });

  // 1. (선택 사항) 수동으로 액세스 토큰 발급
  // 클라이언트가 자동으로 토큰을 발급하고 재사용하므로 설정하지 않아도 됩니다.
  // const { access_token } = await client.getAccessToken();
  // client.setAccessToken(access_token);

  // 2. API 호출 (예: 국내 휴장일 조회)
  // 토큰은 자동으로 처리됩니다!
  // 신규: API는 네임스페이스 아래에 구성됩니다.
  const result = await client.domestic.checkHoliday({
    bassDt: "20231225",
  });
  
  console.log(result.holidays);
}
main();
```

## 주요 기능

- **타입 지원 요청/응답**: 모든 요청 및 응답 본문에 대한 타입이 완벽하게 지원됩니다.
- **자동 페이지네이션**: 페이지네이션된 API에 대해 모든 페이지를 자동으로 가져옵니다(비활성화 가능).
- **환경 지원**: 실전(Real) 및 모의(Demo) 환경 간 전환이 쉽습니다.
- **클라이언트 메서드**: `client.domestic` 및 `client.overseas`를 통해 API에 접근할 수 있습니다.

## API 현황

### 국내 주식 (Domestic Stock)
| Type | Name | Method | Path | Status |
| :--- | :--- | :--- | :--- | :--- |
| REST | 국내휴장일조회 | GET | /uapi/domestic-stock/v1/quotations/chk-holiday | ✅ |
| REST | 주식기본조회 | GET | /uapi/domestic-stock/v1/quotations/search-stock-info | ✅ |
| ... | ... | ... | ... | ... |

[(전체 목록은 문서나 타입 정의를 확인하세요)](./IMPLEMENTATION_STATUS.md)


## 플레이그라운드 (Playground)

playground 폴더에는 예제를 위한 데모 클라이언트와 서버가 포함되어 있습니다.
