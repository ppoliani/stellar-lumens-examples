const sha256 = require('sha.js');

const hash = data => {
  const hasher = new sha256();
  hasher.update(data, 'utf8');
  return hasher.digest();
}

const sign = (data, keys) => {
  const h = hash(data);
  return keys.signDecorated(h);
}

module.exports = {hash, sign};
