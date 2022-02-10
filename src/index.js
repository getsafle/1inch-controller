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

    async getExchangeRate({ toContractAddress, fromContractAddress, fromQuantity }) {
        const toToken = web3Utils.toChecksumAddress(toContractAddress)
        const fromToken = web3Utils.toChecksumAddress(fromContractAddress)
        const URL = `${config.EXCHANGE_RATE_URL}?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${fromQuantity}`
        const { response, error } = await helper.getRequest({ url: URL });
        if (error)
            throw error
        delete response['toToken'];
        delete response['fromToken'];
        return response;
    }

    async getEstimatedGas({ toContractAddress, fromContractAddress, fromQuantity }) {
        const toToken = web3Utils.toChecksumAddress(toContractAddress)
        const fromToken = web3Utils.toChecksumAddress(fromContractAddress)
        const URL = `${config.EXCHANGE_RATE_URL}?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${fromQuantity}`
        const { response, error } = await helper.getRequest({ url: URL });
        if (error)
            throw error
        return { estimatedGas: response.estimatedGas };
    }

    async getRawTransaction({ walletAddress, toContractAddress, fromContractAddress, toQuantity, fromQuantity, slippageTolerance = 1 }) {
        const _toContractAddress = web3Utils.toChecksumAddress(toContractAddress)
        const _fromContractAddress = web3Utils.toChecksumAddress(fromContractAddress)
        const _walletAddress = web3Utils.toChecksumAddress(walletAddress)
        const URL = `${config.SWAP_URL}?fromTokenAddress=${_fromContractAddress}&toTokenAddress=${_toContractAddress}&amount=${fromQuantity}&fromAddress=${_walletAddress}&slippage=${slippageTolerance}`
        const { response, error } = await helper.getRequest({ url: URL });
        if (error)
            throw error
        return response.tx;
    }
}

module.exports = OneInch;