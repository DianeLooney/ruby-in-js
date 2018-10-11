const rubyHandler = {
  get: (target, prop) => {
    if (typeof target[prop] === 'function') return target[prop]()
    if (prop in target) return target[prop];

    return undefined;
    //throw `NoMethodError: undefined method \`${prop.toString()}\` for ${target.toString()}`
  },
  set: (target, prop, value) => {
    target[prop] = value;
  },
  has: (target, key) => {
    return true;
  }
};
const createInstance = (instanceMethods) => {
  let self = new Proxy({}, rubyHandler)
  for(let prop in instanceMethods) {
    const value = instanceMethods[prop];
    if (typeof value !== 'function') {
      self[prop] = value;
      continue;
    }

    eval(`
      with(self) {
        ${prop} = ${value.toString()}
      }
    `)
  }
  return self;
}

const fruitMethods = {
  apple: 'apple',
  banana: () => 'banana',
  fruits: () => `${apple} ${banana}`
}
let fruitBasket = createInstance(fruitMethods)

console.log(fruitBasket.fruits);

// apple banana
