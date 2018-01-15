#!/usr/bin/env node
if(process.env.NODE_ENV === 'development') {
  require('dotenv').config({silent: true});
}

const StellarSdk = require('stellar-sdk');
const {createKeypair, getPrivateKeyFromPair, getPubKeyFromPair} = require('../keyPair');
const {createAccount, getAccount} = require('../account');
const {send} = require('../transaction');

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


const run = async () => {
  const sourceKeys = StellarSdk.Keypair.fromSecret(process.env.DEFAULT_SECRET_KEY);
  const destinationId = process.env.ACCOUNT_2_PUBKEY;
  const result = await send(sourceKeys, process.env.ACCOUNT_2_PUBKEY, StellarSdk.Asset.native(), '5');

  console.log(`TX Hash: ${result.hash}`);
}

run();
