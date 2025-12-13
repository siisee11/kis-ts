# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2025-12-13

### ⚠️ Breaking Changes

- **Client Structure Refactor**: The `KisOverseasClient` method names have been refactored to follow the API URL structure.
    - `client.overseas.fetchOverseasPrice` is now `client.overseas.quotations.price`
    - `client.overseas.fetchOverseasDailyPrice` is now `client.overseas.quotations.dailyPrice`
    - `client.overseas.searchOverseasStock` is now `client.overseas.quotations.searchInfo`
    - `client.overseas.fetchOverseasMarketCapRanking` is now `client.overseas.ranking.marketCap`
    - `client.overseas.placeOverseasOrder` is now `client.overseas.trading.order`
    - And similarly for other `overseas` methods, organized into `quotations`, `ranking`, and `trading` namespaces.

### Added

- New nested client structure for better organization and API alignment.
