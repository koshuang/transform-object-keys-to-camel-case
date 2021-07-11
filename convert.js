import { log } from './log';

export function convert(user) {
  // guards
  if (!(user instanceof Object)) {
    throw new Error('Input is not a object');
  }

  if (typeof user.then === 'function') {
    throw new Error('Input should not be a promise');
  }

  if (Object.keys(user) == []) {
    return user;
  }

  const returnUser = Object
    .entries(user)
    .reduce((finalUser, [key, value]) => {
      let tempKey = toCamelCase(key);

      if (Array.isArray(value)) {
        return {
          ...finalUser,
          [tempKey]: getConvertedArray(value),
        };
      }

      if (value instanceof Object) {
        return {
          ...finalUser,
          [tempKey]: convert(value),
        };
      }

      return {
        ...finalUser,
        [tempKey]: value,
      };
    }, {});

  return returnUser;
}

function getConvertedArray(arr) {
  if (arr.length == 0 || !(arr[0] instanceof Object)) {
    return arr;
  }

  return arr.map((obj) => convert(obj));
}

export function toCamelCase(key) {
  const [first, ...rest] = key.split("_");
  const camelCased = rest.map((it) => {
    return it[0].toUpperCase() + it.slice(1);
  });
  return first + camelCased.join("");
}
