const StellarSdk = require('stellar-sdk');
const {createServer} = require('./server');
const {getAccount} = require('./account');
const {prop} = require('./fn');

const sendAsset = async (sourceKeys, destination, asset, amount, memo='Test Transaction') => {
  const server = createServer();
  
  try { 
    const destinationAccount = await getAccount(destination);
    const sourceAccount = await getAccount(sourceKeys.publicKey());
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount)
      .addOperation(StellarSdk.Operation.payment({destination, asset, amount}))
      // A memo allows you to add your own metadata to a transaction. It's
      // optional and does not affect how Stellar treats the transaction.
      .addMemo(StellarSdk.Memo.text(memo))
      .build();

    // Sign the transaction to prove you are actually the person sending it.
    transaction.sign(sourceKeys);
    return await server.submitTransaction(transaction);
  }
  catch(err) {
    console.error(`Error sending a transaction: ${err}`)
  }
}

const submitTransaction = async tx => {
  const server = createServer();
  return await server.submitTransaction(tx);
}

const changeTrust = async (asset, limit, receivingKeys) => {
  try {
    const receiver = await getAccount(receivingKeys.publicKey());
    const tx =  new StellarSdk.TransactionBuilder(receiver)
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(StellarSdk.Operation.changeTrust({asset, limit}))
      .build();

    tx.sign(receivingKeys);
    return await submitTransaction(tx);
  }
  catch(err) {
    console.error(`Error while setting a trustline: ${err}`)
  }
}

module.exports = {sendAsset, submitTransaction, changeTrust};
