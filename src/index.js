const config = require('./config');
const helper = require('./utils/helper')
const web3Utils = require('web3-utils')
const { ethers, Contract } = require('ethers')
const { TOKEN_CONTRACT_ABI } = require('./utils/tokenABI')
const tokenList = require('@getsafle/safle-token-lists')

class OneInch {

    constructor(chain) {
        this.chain = chain;
        const { url, error: urlError } = helper.getRPCURL(chain)
        if (urlError) {
            throw helper.setErrorResponse(urlError)
        }
        this.rpcUrl = url
    }

    async getSupportedChains() {
        return { chains: config.SUPPORTED_CHAINS };
    }

    async getSupportedTokens() {
        const tokens = await tokenList.getTokensOneInch(this.chain);
        return tokens;
    }

    async getExchangeRate({ toContractAddress, fromContractAddress, fromQuantity }) {

        const { url, error: urlError } = helper.getBaseURL(this.chain);
        if (urlError) {
            throw helper.setErrorResponse(urlError)
        }
        const toToken = web3Utils.toChecksumAddress(toContractAddress)
        const fromToken = web3Utils.toChecksumAddress(fromContractAddress)
        const URL = `${url}/quote?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${fromQuantity}`
        const { response, error } = await helper.getRequest({ url: URL });
        if (error)
            throw helper.setErrorResponse(error)

        delete response['toToken'];
        delete response['fromToken'];
        delete response['protocols']
        return response;
    }

    async getEstimatedGas({ toContractAddress, fromContractAddress, fromQuantity }) {
        const { url, error: urlError } = helper.getBaseURL(this.chain);
        if (urlError) {
            throw helper.setErrorResponse(urlError)
        }
        const toToken = web3Utils.toChecksumAddress(toContractAddress)
        const fromToken = web3Utils.toChecksumAddress(fromContractAddress)
        const URL = `${url}/quote?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${fromQuantity}`
        const { response, error } = await helper.getRequest({ url: URL });
        if (error)
            throw helper.setErrorResponse(error)
        return { estimatedGas: response.estimatedGas };
    }

    async getRawTransaction({ walletAddress, toContractAddress, fromContractAddress, toQuantity, fromQuantity, slippageTolerance }) {
        const { url, error: urlError } = helper.getBaseURL(this.chain);
        if (urlError) {
            throw helper.setErrorResponse(urlError)
        }
        const _toContractAddress = web3Utils.toChecksumAddress(toContractAddress)
        const _fromContractAddress = web3Utils.toChecksumAddress(fromContractAddress)
        const _walletAddress = web3Utils.toChecksumAddress(walletAddress)
        const URL = `${url}/swap?fromTokenAddress=${_fromContractAddress}&toTokenAddress=${_toContractAddress}&amount=${fromQuantity}&fromAddress=${_walletAddress}&slippage=${slippageTolerance}`
        const { response, error } = await helper.getRequest({ url: URL });

        if (error && error[0].data.description.includes(`Not enough ${fromContractAddress} balance.`)) {
            throw helper.setErrorResponse({ message: 'Insufficient balance.' })
        } else if (error) {
            throw helper.setErrorResponse(error)
        }

        return response.tx;
    }

    async approvalRawTransaction({ fromContractAddress, walletAddress, fromQuantity }) {
        {
            if (fromContractAddress.toLowerCase() === config.ETHEREUM_ADDRESS.toLowerCase()) {
                return true
            }
            const web3Provider = new ethers.providers.JsonRpcProvider(this.rpcUrl);
            const contract = new Contract(fromContractAddress, TOKEN_CONTRACT_ABI, web3Provider);
            const checkAllowance = await contract.allowance(walletAddress, config.SWAP_ROUTER_ADDRESS);

            if (Number(checkAllowance) < fromQuantity) {

                const { url, error: urlError } = helper.getBaseURL(this.chain);
                if (urlError) {
                    throw helper.setErrorResponse(urlError)
                }
                const fromToken = web3Utils.toChecksumAddress(fromContractAddress)
                const URL = `${url}/approve/transaction?tokenAddress=${fromToken}&amount=${fromQuantity}`
                const { response, error } = await helper.getRequest({ url: URL });
                if (error)
                    throw helper.setErrorResponse(error);

                response.from = walletAddress;
                response.gas = web3Utils.hexToNumber((await contract.estimateGas.approve(config.SWAP_ROUTER_ADDRESS, fromQuantity, { from: walletAddress }))._hex);
                return response;
            }
            else
                return true
        }
    }
}

module.exports = OneInch;