const StellarSdk = require('stellar-sdk');
const Maybe = require('folktale/maybe');
const {prop} = require('./fn');

let _server = Maybe.Nothing();

const createServer = () => _server.matchWith({
  Just: prop('value'),
  Nothing: () => {
    _server = Maybe.Just(new StellarSdk.Server(process.env.HORIZON_URL));
    return _server;
  }
});

module.exports = {createServer};
