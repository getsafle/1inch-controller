const config = require('./config');
const helper = require('./utils/helper')
const web3Utils = require('web3-utils')
const { ethers, Contract } = require('ethers')
const { TOKEN_CONTRACT_ABI } = require('./utils/tokenABI')
const tokenList = require('@getsafle/safle-token-lists')
const Web3 = require('web3');

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

        if (this.chain === 'bsc') {
            return response.tx
        }

        const { url: rpcURL } = helper.getRPCURL(this.chain);

        const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

        const gasData = await helper.getGasParams(this.chain);

        const rawTransaction = {
            to: response.tx.to,
            from: response.tx.from,
            data: response.tx.data,
            value: Web3.utils.numberToHex(response.tx.value),
            gasLimit: response.tx.gas,
            maxFeePerGas: Web3.utils.numberToHex(Web3.utils.toWei(Number(gasData.maxFeePerGas).toFixed(4), 'gwei')),
            maxPriorityFeePerGas: Web3.utils.numberToHex(Web3.utils.toWei(Number(gasData.maxPriorityFeePerGas).toFixed(4), 'gwei')),
            nonce: await web3.eth.getTransactionCount(response.tx.from),
            chainId: config.CHAIN_ID(this.chain),
        }

        return rawTransaction;
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

                if (this.chain === 'bsc') {
                    return response;
                }

                const { url: rpcURL } = helper.getRPCURL(this.chain);

                const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

                const gasData = await helper.getGasParams(this.chain);

                const output = {
                    to: response.to,
                    from: response.from,
                    data: response.data,
                    value: Web3.utils.numberToHex(response.value),
                    gasLimit: response.gas,
                    maxFeePerGas: Web3.utils.numberToHex(Web3.utils.toWei(Number(gasData.maxFeePerGas).toFixed(4), 'gwei')),
                    maxPriorityFeePerGas: Web3.utils.numberToHex(Web3.utils.toWei(Number(gasData.maxPriorityFeePerGas).toFixed(4), 'gwei')),
                    nonce: await web3.eth.getTransactionCount(response.from),
                    chainId: config.CHAIN_ID(this.chain),
                }

                return output;
            }
            else
                return true
        }
    }
}

module.exports = OneInch;