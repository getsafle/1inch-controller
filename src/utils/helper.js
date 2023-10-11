const axios = require('axios');
const { ERROR_MESSAGES: { TOKEN_PAIR_DOESNOT_EXIST, INVALID_CHAIN_ERORR, INSUFFICIENT_BALANCE } } = require('./const');
const { ONEINCH_BASE_URL, ETH_RPC, POLYGON_RPC, BSC_RPC, ETH_GAS_API, POLYGON_GAS_API } = require('../config');

const getRequest = async ({ url }) => {
    try {
        const response = await axios({
            url: `${url}`,
            method: 'GET',
        });
        return { response: response.data };
    } catch (error) {
        return{ error: error.response.data}
    }
};


const setErrorResponse = (err) => {
    switch (err.message) {
        case INVALID_CHAIN_ERORR:
            return INVALID_CHAIN_ERORR;
        case INSUFFICIENT_BALANCE:
            return INSUFFICIENT_BALANCE;
        default:
            return TOKEN_PAIR_DOESNOT_EXIST;
    }
}

const getBaseURL = (chain) => {
    switch (chain) {
        case 'ethereum':
            return { url: `${ONEINCH_BASE_URL}/1` };
        case 'polygon':
            return { url: `${ONEINCH_BASE_URL}/137` };
        case 'bsc':
            return { url: `${ONEINCH_BASE_URL}/56` };
        default:
            return { error: { message: INVALID_CHAIN_ERORR } }
    }
}

const getRPCURL = (chain) => {
    switch (chain) {
        case 'ethereum':
            return { url: ETH_RPC };
        case 'polygon':
            return { url: POLYGON_RPC };
        case 'bsc':
            return { url: BSC_RPC };
        default:
            return { error: { message: INVALID_CHAIN_ERORR } }
    }
}

const getGasParams = async(chain) => {

    let url;

    if (chain === 'ethereum') {
        url = ETH_GAS_API
    } else {
        url = POLYGON_GAS_API
    }

    const { response, error } = await getRequest({ url });

    if (error) {
        return setErrorResponse(error)
    }

    let result;

    if (chain === 'ethereum') {
        result = {
            maxFeePerGas: response.medium.suggestedMaxFeePerGas,
            maxPriorityFeePerGas: response.medium.suggestedMaxPriorityFeePerGas,
        }
    } else {
        result = {
            maxFeePerGas: response.standard.maxFee,
            maxPriorityFeePerGas: response.standard.maxPriorityFee,
        }
    }

    return result;
}

module.exports = { getRequest, setErrorResponse, getBaseURL, getRPCURL, getGasParams };
