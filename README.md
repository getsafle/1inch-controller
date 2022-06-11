# 1inch-dex-controller

This repo contains 1inch dex controller for safle swap.

### Get supported tokens

```
await getSupportedTokens()
```

This will give us the list of all tokens supported in 1inch.

### Get Exchange Rate

```
await getExchangeRate({ toContractAddress, fromContractAddress, fromQuantity })
```

This will give us the exchange rate of 2 tokens.<br/>
Amount of `fromContractAddress` the user will receive for `fromQuantity` of `toContractAddress`.

### Get Estimated gas

```
await getEstimatedGas({ toContractAddress, fromContractAddress, fromQuantity })
```

This will give us the estimated amout of gas for the swap.

### Get Raw Transaction

```
await getRawTransaction({ walletAddress, toContractAddress, fromContractAddress, toQuantity, fromQuantity, slippageTolerance })
```

This will give us the raw transaction to swap the tokens on 1inch.


### Get Approval Transaction

```
await getApprovalTransaction({ walletAddress,  fromContractAddress, fromQuantity })
```

This will give us the raw transaction to approve spender on 1inch.
