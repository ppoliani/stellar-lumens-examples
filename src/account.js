const axios = require('axios');
const StellarSdk = require('stellar-sdk');
const {createServer} = require('./server');
const {prop} = require('./fn');

const createAccount = async pubKey => {
  try {
    const response = await axios.get(`${process.env.HORIZON_URL}/friendbot?addr=${pubKey}`);
    return response;
  }
  catch(err) {
    console.error(`An error happened while creating a new account: ${err}`)
  }
}

const getAccount = async pubKey => {
  try {
    const server = createServer();
    return await server.loadAccount(pubKey);
  }
  catch(err) {
    console.error(`An error happened while getting balance for account: ${err}`)
  }
}

const burnAccount = async signingKeys => {
  try {
    const server = createServer();
    const account = await server.loadAccount(signingKeys.publicKey());
    const tx =  new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.setOptions({
        masterWeight: 0,
      }))
      .build();

    tx.sign(signingKeys);
    return await server.submitTransaction(tx);
  }
  catch(err) {
    console.error(`Error while burning the keys: ${err}`)
  }
}

module.exports = {createAccount, getAccount, burnAccount};
