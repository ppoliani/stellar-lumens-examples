// composition hack
Function.prototype['∘'] = function(f){
  return x => this(f(x))
}

const partial = (fn, ...args) => (...restArgs) => fn.apply(this, args.concat(restArgs));
const noop = () => {};
const prop = key => obj => obj[key];

module.exports = {
  partial,
  noop,
  prop
};
