const StellarSdk = require('stellar-sdk');
const {createServer} = require('./server');
const {getAccount} = require('./account');
const {prop} = require('./fn');

const send = async (sourceKeys, destination, asset, amount) => {
  const server = createServer();
  
  try { 
    const destinationAccount = await getAccount(destination);
    const sourceAccount = await getAccount(sourceKeys.publicKey());
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount)
      .addOperation(StellarSdk.Operation.payment({destination, asset, amount}))
      // A memo allows you to add your own metadata to a transaction. It's
      // optional and does not affect how Stellar treats the transaction.
      .addMemo(StellarSdk.Memo.text('Test Transaction'))
      .build();

    // Sign the transaction to prove you are actually the person sending it.
    transaction.sign(sourceKeys);
    return await server.submitTransaction(transaction);
  }
  catch(err) {
    console.error(`Error sending a transaction: ${err}`)
  }
}

module.exports = {send};
