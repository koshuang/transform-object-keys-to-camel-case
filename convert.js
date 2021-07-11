import { log } from './log';

export function convert(user) {
  let returnUser = {};

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

  for (var key in user) {
    // 判断属性是否是对象
    let tempKey = getTempKey(key);

    if (user[key] instanceof Object && !(user[key] instanceof Array)) {
      returnUser[tempKey] = convert(user[key]);
      continue;
    }

    if (!(user[key] instanceof Array)) {
      returnUser[tempKey] = user[key];
      //对 A___多个下划线的情况没做处理 懒得写判断了
      continue;
    }

    if (user[key].length == 0 || !(user[key][0] instanceof Object)) {
      returnUser[tempKey] = user[key];
      continue;
    }

    returnUser[tempKey] = getConvertedArray(user[key]);
  }

  return returnUser;
}

function getConvertedArray(arr) {
  return arr.map((obj) => convert(obj));
}

function getTempKey(key) {
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

  log.debug({ index, tempKey });

  return tempKey;
}
