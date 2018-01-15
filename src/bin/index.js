#!/usr/bin/env node
if(process.env.NODE_ENV === 'development') {
  require('dotenv').config({silent: true});
}

const {createKeypair, getPrivateKeyFromPair, getPubKeyFromPair} = require('../keyPair');

const pair = createKeypair();
const privKey = getPrivateKeyFromPair(pair);
const pubKey = getPubKeyFromPair(pair);

console.log(`Private Key (seed): ${privKey}`);
console.log(`Public Key: ${pubKey}`);
