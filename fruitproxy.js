
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

with(x) {
  counter = 0
  inc = () => { counter = counter + 1 }
}
/*
> x.counter
0
> x.inc
> x.counter
1
> x.inc
> x.inc
> x.inc
> x.counter
5
*/
