const config = require('./config');
const helper = require('./utils/helper')

class OneInch {

    async getSupportedTokens() {
        const { response, error } = await helper.getRequest({ url: config.SUPPORTED_TOKENS_URL });
        if (error)
            throw error
        return response;
    }

    async getExchangeRate({ toContractAddress, fromContractAddress, fromQuantity }) {
        const URL = `${config.EXCHANGE_RATE_URL}?fromTokenAddress=${fromContractAddress}&toTokenAddress=${toContractAddress}&amount=${fromQuantity}`
        const { response, error } = await helper.getRequest({ url: URL });
        if (error)
            throw error
        delete response['toToken'];
        delete response['fromToken'];
        return response;
    }

    async getRawTransaction({ walletAddress, toContractAddress, fromContractAddress, toQuantity, fromQuantity, slippageTolerance = 1 }) {
        const URL = `${config.SWAP_URL}?fromTokenAddress=${fromContractAddress}&toTokenAddress=${toContractAddress}&amount=${fromQuantity}&fromAddress=${walletAddress}&slippage=${slippageTolerance}`
        const { response, error } = await helper.getRequest({ url: URL });
        if (error)
            throw error
        return response.tx;
    }
}

module.exports = OneInch;