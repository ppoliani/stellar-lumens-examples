#!/usr/bin/env node
if(process.env.NODE_ENV === 'development') {
  require('dotenv').config({silent: true});
}

const {createKeypair, getPrivateKeyFromPair, getPubKeyFromPair} = require('../keyPair');
const {createAccount, getAccount} = require('../account');

const createNewPair = () => {
  const pair = createKeypair();
  const privKey = getPrivateKeyFromPair(pair);
  const pubKey = getPubKeyFromPair(pair);

  console.log(`Private Key (seed): ${privKey}`);
  console.log(`Public Key: ${pubKey}`);
}

const createNewAccount = async pubKey => {
  try {
    const newAccount = createAccount(process.env.DEFAULT_PUBKEY);
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
  const pubKey = process.env.DEFAULT_PUBKEY;

  // await createAccount(pubKey);
  const accountBalances = await getBalanceFor(pubKey);

  accountBalances.forEach(balance  => {
    console.log(`Type: ${balance.asset_type} \n Balance: ${balance.balance}`);
  });
}


run();
