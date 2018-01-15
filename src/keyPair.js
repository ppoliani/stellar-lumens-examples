const StellarSdk = require('stellar-sdk');

const createKeypair = () => StellarSdk.Keypair.random();
const getPrivateKeyFromPair = pair => pair.secret();
const getPubKeyFromPair = pair => pair.publicKey();

module.exports = {
  createKeypair,
  getPrivateKeyFromPair,
  getPubKeyFromPair
};
