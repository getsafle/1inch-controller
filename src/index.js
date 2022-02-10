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
        console.log("URL ", URL)
        const { response, error } = await helper.getRequest({ url: URL });
        if (error)
            throw error
        delete response['toToken'];
        delete response['fromToken'];
        return response;
    }
}

module.exports = OneInch;