const config = require('./config');
const helper = require('./utils/helper')
const web3Utils = require('web3-utils')

class OneInch {

    async getSupportedTokens() {
        const { response, error } = await helper.getRequest({ url: config.SUPPORTED_TOKENS_URL });
        if (error)
            throw error
        return response;
    }

    async getExchangeRate(_toToken, _fromToken, quantity) {
        const toToken = web3Utils.toChecksumAddress(_toToken)
        const fromToken = web3Utils.toChecksumAddress(_fromToken)
        const URL = `${config.EXCHANGE_RATE_URL}?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${quantity}`
        const { response, error } = await helper.getRequest({ url: URL });
        if (error)
            throw error
        return response;
    }

    async getEstimatedGas(_toToken, _fromToken, quantity) {
        const toToken = web3Utils.toChecksumAddress(_toToken)
        const fromToken = web3Utils.toChecksumAddress(_fromToken)
        const URL = `${config.EXCHANGE_RATE_URL}?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${quantity}`
        const { response, error } = await helper.getRequest({ url: URL });
        if (error)
            throw error
        return { estimatedGas: response.estimatedGas };
    }

    async getRawTransaction(_walletAddress, _toContractAddress, _fromContractAddress, toQuantity, fromQuantity, slippageTolerance = 1) {
        const toContractAddress = web3Utils.toChecksumAddress(_toContractAddress)
        const fromContractAddress = web3Utils.toChecksumAddress(_fromContractAddress)
        const walletAddress = web3Utils.toChecksumAddress(_walletAddress)
        const URL = `${config.SWAP_URL}?fromTokenAddress=${fromContractAddress}&toTokenAddress=${toContractAddress}&amount=${fromQuantity}&fromAddress=${walletAddress}&slippage=${slippageTolerance}`
        const { response, error } = await helper.getRequest({ url: URL });
        if (error)
            throw error
        return response.tx;
    }
}

module.exports = OneInch;