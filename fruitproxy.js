
const x = new Proxy({}, {
  get: (target, prop, receiver) => {
    if (typeof target[prop] === 'function') return target[prop]()
    return target[prop];
  },
  set: (target, prop, value) => {
    target[prop] = value;
  },
  has: (target, key) => {
    return true;
  }
});
with(x) {
  apple = 'apple'
  banana = () => 'banana'
  fruits = () => `${apple} ${banana}`
}
x.fruits