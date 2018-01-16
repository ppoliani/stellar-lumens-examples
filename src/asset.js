const StellarSdk = require('stellar-sdk');
const {getAccount} = require('./account');
const {submitTransaction, sendAsset} = require('./transaction');

const createAsset = (symbol, issuingKeys) => new StellarSdk.Asset(symbol, issuingKeys.publicKey());

module.exports = {createAsset};
