const StellarSdk = require('stellar-sdk');
const {createServer} = require('./server');

const changeTrustAndSend = async (symbol, issuingKeys, receivingKeys) => {
  const customAsset = new StellarSdk.Asset(symbol, issuingKeys.publicKey());
  const server = createServer();

  try {
    const receiver = await server.loadAccount(receivingKeys.publicKey());
    const tx =  new StellarSdk.TransactionBuilder(receiver)
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: customAsset,
        limit: '1000'
      }))
      .build();

    tx.sign(receivingKeys);
    
    const result = await server.submitTransaction(tx);
    const issuer = await server.loadAccount(issuingKeys.publicKey())
    const sendTX = new StellarSdk.TransactionBuilder(issuer)
      .addOperation(StellarSdk.Operation.payment({
        destination: receivingKeys.publicKey(),
        asset: customAsset,
        amount: '10000'
      }))
      .build();

    sendTX.sign(issuingKeys);
    return await server.submitTransaction(sendTX);
  }
  catch(err) {
    console.error(`Error while sending a custom token: ${err}`)
  }
}

module.exports = {changeTrustAndSend};
