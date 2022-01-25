const config = require('./config');
const helper = require('./utils/helper')

class OneInch {

    async getSupportedTokens() {
        const { response, error } = await helper.getRequest({ url: config.SUPPORTED_TOKENS_URL });
        if (error)
            throw error
        return response;
    }

    async getExchangeRate(toToken, fromToken, quantity) {
        const URL = `${config.EXCHANGE_RATE_URL}?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${quantity}`
        console.log("URL ", URL)
        const { response, error } = await helper.getRequest({ url: URL });
        if (error)
            throw error
        return response;
    }
}

module.exports = OneInch;