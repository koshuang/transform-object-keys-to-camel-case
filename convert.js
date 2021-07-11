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

function toCamelCase(key) {
  const index = key.indexOf('_') + 1;
  let tempKey;
  // key值改变
  if (index != 0) {
    const up = key.substr(index, 1); // 需要转位大写的地方
    if (key.length - 1 == index) {
      tempKey = `${key.substr(0, index - 1)}` + `${up.toUpperCase()}`;
    } else {
      tempKey =
        `${key.substr(0, index - 1)}` +
        `${up.toUpperCase()}` +
        `${key.substr(index + 1)}`;
    }
  } else {
    tempKey = key; //没有下划线
  }

  return tempKey;
}
