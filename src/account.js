const axios = require('axios');
const StellarSdk = require('stellar-sdk');

const createAccount = pubKey => {
  try {
    const response = await axios.get(`process.env.HORIZON_URL/friendbot?addr=${pubKey}`);
  }
  catch(err) {
    console.error(`An error happened while creating a new account: ${err}`)
  }

}
