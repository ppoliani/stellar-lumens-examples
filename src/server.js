const StellarSdk = require('stellar-sdk');
const Maybe = require('folktale/maybe');
const {prop} = require('./fn');

let _server = Maybe.Nothing();

const createServer = () => _server.matchWith({
  Just: prop('value'),
  Nothing: () => {
    const server = new StellarSdk.Server(process.env.HORIZON_URL);
    _server = Maybe.Just(server);
    return server;
  }
});

module.exports = {createServer};
