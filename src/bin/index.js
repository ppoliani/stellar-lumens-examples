#!/usr/bin/env node
if(process.env.NODE_ENV === 'development') {
  require('dotenv').config({silent: true});
}

const StellarSdk = require('stellar-sdk');
const {createKeypair, getPrivateKeyFromPair, getPubKeyFromPair, getKeys} = require('../keyPair');
const {createAccount, getAccount, burnAccount} = require('../account');
const {sendAsset, submitTransaction, changeTrust} = require('../transaction');
const {createAsset} = require('../asset');

StellarSdk.Network.useTestNetwork();

const createNewPair = () => {
  const pair = createKeypair();
  const privKey = getPrivateKeyFromPair(pair);
  const pubKey = getPubKeyFromPair(pair);

  console.log(`Private Key (seed): ${privKey}`);
  console.log(`Public Key: ${pubKey}`);
}

const createNewAccount = async pubKey => {
  try {
    const newAccount = createAccount(pubKey);
  }
  catch(err) {
    console.error(err);
  }
}

const getBalanceFor = async pubKey => {
  try {
    const account = await getAccount(pubKey);
    return account.balances;
  }
  catch(err) {
    console.error(err);
  }
}

const createTrustline = async () => {
  const issuingKeys = getKeys(process.env.ISSUER_SECRET_KEY);
  const receivingKeys = getKeys(process.env.ACCOUNT_2_SECRET_KEY);
  const LabCoin = createAsset('LabCoin', issuingKeys);
  const result = await changeTrust(LabCoin, '1000000', receivingKeys);
}

const sendLabCoin = async () => {
  const issuingKeys = getKeys(process.env.ISSUER_SECRET_KEY);
  const receivingKeys = getKeys(process.env.ACCOUNT_2_SECRET_KEY);
  const LabCoin = createAsset('LabCoin', issuingKeys);
  const issuer = await getAccount(issuingKeys.publicKey())
  const sendTX = await sendAsset(issuingKeys, receivingKeys.publicKey(), LabCoin, '1000000');
}

(async () => {
  createTrustline();
  sendLabCoin();
})();
