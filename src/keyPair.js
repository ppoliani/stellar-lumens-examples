const StellarSdk = require('stellar-sdk');

const createKeypair = () => StellarSdk.Keypair.random();
const getPrivateKeyFromPair = pair => pair.secret();
const getPubKeyFromPair = pair => pair.publicKey();
const getKeys = privateKey => StellarSdk.Keypair.fromSecret(privateKey);

module.exports = {
  getKeys,
  createKeypair,
  getPrivateKeyFromPair,
  getPubKeyFromPair
};
