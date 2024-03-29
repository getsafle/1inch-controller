module.exports = {
    ONEINCH_BASE_URL: 'https://api.1inch.dev/swap/v5.2',
    SUPPORTED_CHAINS: ['ethereum', 'polygon', 'bsc'],
    ETHEREUM_ADDRESS: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    SWAP_ROUTER_ADDRESS: '0x1111111254eeb25477b68fb85ed929f73a960582',
    ETH_RPC: 'https://mainnet.infura.io/v3/6145d532688844c4b6db32574d90e19f',
    POLYGON_RPC: 'https://polygon-mainnet.infura.io/v3/6145d532688844c4b6db32574d90e19f',
    BSC_RPC: 'https://bsc-dataseed1.binance.org/',
    ETH_GAS_API: 'https://gas-api.metaswap.codefi.network/networks/1/suggestedGasFees',
    POLYGON_GAS_API: 'https://gasstation.polygon.technology/v2',
    CHAIN_ID: (chain) => {
        if (chain === 'ethereum') {
            return 1;
        } else if (chain === 'polygon') {
            return 137;
        } else {
            return 56;
        }
    },
    ONEINCH_AUTH_TOKEN: 'I00gf2qW3ebQSNZrcLrfmZelxmLxqdyL',
    PROXY_SERVICE_BASE_URL: 'https://proxy.getsafle.com'
}