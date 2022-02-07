# 1inch-dex-controller

This repo contains 1inch dex controller for safle swap.

### Get supported tokens

```
await getSupportedTokens()
```

This will give us the list of all tokens supported in 1inch.

### Get Exchange Rate

```
await getExchangeRate(_toToken, _fromToken, quantity)
```

This will give us the exchange rate of 2 tokens.<br/>
Amount of `_fromToken` the user will receive for `quantity` of `_toToken`.

### Get Estimated gas

```
await getEstimatedGas(_toToken, _fromToken, quantity)
```

This will give us the estimated amout of gas for the swap.

### Get Raw Transaction

```
await getRawTransaction(_walletAddress, _toContractAddress, _fromContractAddress, toQuantity, fromQuantity, slippageTolerance = 1)
```

This will give us the raw transaction to swap the tokens on 1inch.
