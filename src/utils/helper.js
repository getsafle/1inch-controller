const axios = require('axios');
const { ERROR_MESSAGES: { TOKEN_PAIR_DOESNOT_EXIST, INVALID_CHAIN_ERORR, INSUFFICIENT_BALANCE } } = require('./const');
const { ONEINCH_BASE_URL, ETH_RPC, POLYGON_RPC, BSC_RPC } = require('../config');

const getRequest = async ({ url }) => {
    try {
        const response = await axios({
            url: `${url}`,
            method: 'GET',
        });
        return { response: response.data };
    } catch (error) {
        return { error: [{ name: 'server', message: `There is some issue, Please try after some time. ${error.message && error.message}`, data: error.response && error.response.data ? error.response.data : {} }] };
    }
};


const setErrorResponse = (err) => {
    switch (err.message) {
        case INVALID_CHAIN_ERORR:
            throw INVALID_CHAIN_ERORR;
        case INSUFFICIENT_BALANCE:
            throw INSUFFICIENT_BALANCE;
        default:
            throw TOKEN_PAIR_DOESNOT_EXIST;
    }
}

const getBaseURL = async (chain) => {
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

const getRPCURL = async (chain) => {
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

module.exports = { getRequest, setErrorResponse, getBaseURL, getRPCURL };
