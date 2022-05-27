const axios = require('axios');
const {  ERROR_MESSAGES: { TOKEN_PAIR_DOESNOT_EXIST,INVALID_CHAIN_ERORR } } = require('./const');
const { ONEINCH_BASE_URL } = require('../config');
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
            return { err, message: TOKEN_PAIR_DOESNOT_EXIST };
}

const getBaseURL = async (chain) => {
    switch (chain) {
        case 'ethereum':
            return { url: `${ONEINCH_BASE_URL}/1` };
        default:
            return { error: INVALID_CHAIN_ERORR }
}
}

module.exports = { getRequest, setErrorResponse, getBaseURL };
