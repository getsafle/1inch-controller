### 1.0.0 (2022-01-25)

- Added method to get list of supported tokens

### 1.0.0 (2022-02-7)

- Added method to get exhange rate
- Added method to get estimated gas
- Added method to get raw transaction

### 1.0.0 (2022-03-15)

- Added pipelines to publish SDK to npm 

### 1.0.1 (2022-05-03)

- Updated method getRawTransaction to accept slippage as a parameter

### 1.0.2 (2022-05-05)

- Updated package version to publish the package to npm

### 1.0.3 (2022-05-23)

- Updated error handling to handle errors from the SDK

### 1.0.4 (2022-05-24)

- Added method to retun list of supported chains
- Updated constructor to accept chain as a parameter
- Updated methods to get base URL from helper according to chain selected 

### 1.0.5 (2022-05-24)

- Added support for polygon chain

### 1.0.6 (2022-05-24)

- Added support for binance smart chain


### 1.0.7 (2022-06-11)

- Added method to apporve spender contract

### 1.0.8 (2022-09-01)

- Updated RPC URL

### 1.0.9 (2022-09-12)

- Updated README file with the latest functional & non-functional documentation

### 1.1.0 (2022-09-26)

- Multichain support

### 1.1.1 (2022-09-26)

- Updated method to get list of supported tokens

### 1.1.2 (2022-12-14)

- Functions `getRawTransaction()` will throw an error `Insufficient balance.` if the `from` address does not have enough assets to swap.

### 1.1.3 (2022-12-14)

- Removed the async declaration in the function `getBaseURL()` and `getRPCURL()`.

### 1.1.4 (2022-12-14)

- Output of the `approvalRawTransaction()` will be returned directly without the response object.

### 1.1.5 (2022-12-15)

- Functions `approvalRawTransaction()` and `getRawTransaction()` will return the type2 raw transaction.

### 1.1.6 (2023-06-13)

- Migrated 1inch API's from v4.0 to v5.0
- Updated license in package.json
- Updated infura API key

### 1.1.7 (2023-06-17)

- Updated polygon mainnet gasstation URL

### 1.1.8 (2023-06-30)

- Updated router contarct address

### 1.1.9 (2023-07-05)

- Updated 1Inch API base URL


### 1.2.0 (2023-10-11)

- Updated error handling from 1Inch API's
### 1.2.1 (2023-10-26)

- Updated 1Inch API's to v5.2
- Updated @getsafle/safle-token-lists package to v1.0.4

### 1.2.2 (2023-10-31)

- Integrated proxy service