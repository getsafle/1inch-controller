# 1inch-dex-controller

This SDK houses the functions to interact with the 1Inch Contracts.

## Installation

To install this SDK,

```sh
npm install --save @getsafle/1inch-controller
```

## Initialization

Initialize the constructor,

```js
const OneInch = require('@getsafle/1inch-controller');

const controller = new OneInch(chain);
```

> Get supported tokens

<br>

This function will give us the list of all tokens supported by 1inch.

```js
await controller.getSupportedTokens()
```

<br>

> Get supported chains

<br>

This function will give us the list of all the supported chains.

```js
await controller.getSupportedChains()
```

<br>

> Get Exchange Rate

<br>

This will give us the exchange rate of 2 tokens.
Amount of `fromContractAddress` the user will receive for `fromQuantity` of `toContractAddress`.

```js
await controller.getExchangeRate({ toContractAddress, fromContractAddress, fromQuantity })
```

<br>

> Get Estimated gas

<br>

This will give us the estimated amount of gas needed to do the swap.

```js
await controller.getEstimatedGas({ toContractAddress, fromContractAddress, fromQuantity })
```

<br>

> Get Raw Transaction

<br>

This will give us the raw transaction to swap the tokens on 1inch.

```js
await controller.getRawTransaction({ walletAddress, toContractAddress, fromContractAddress, toQuantity, fromQuantity, slippageTolerance })
```

<br>

> Get Approval Transaction

<br>

This function will call the approval smart contract function to approve spending `fromQuantity` for the `fromContractAddress` from the `walletAddress`.

```js
await controller.approvalRawTransaction({ walletAddress,  fromContractAddress, fromQuantity })
```
