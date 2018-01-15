const axios = require('axios');
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
    const server = createServer()
      .matchWith({
        Just: prop('value'),
        Nothing: () => console.error(`Error creating a server`)
      });
    
    return await server.loadAccount(pubKey);
  }
  catch(err) {
    console.error(`An error happened while getting balance for account: ${err}`)
  }
}

module.exports = {createAccount, getAccount};
