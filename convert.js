import { log } from './log';
import { toCamelCase } from './toCamelCase';

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

  const returnUser = convertObject(user);

  return returnUser;
}

function convertObject(user) {
  return Object
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
}

function getConvertedArray(arr) {
  if (arr.length == 0 || !(arr[0] instanceof Object)) {
    return arr;
  }

  return arr.map((obj) => convert(obj));
}
