export function convert(user) {
  let returnUser = {};
  // 判断接受类型是否是object 且不是Promise
  if (user instanceof Object && typeof user.then !== 'function') {
    if (Object.keys(user) == []) {
      return user;
    } else {
      for (var key in user) {
        const idx = key.indexOf('_') + 1;
        let tempKey;
        // key值改变
        if (idx != 0) {
          const up = key.substr(idx, 1); // 需要转位大写的地方
          if (key.length - 1 == idx) {
            tempKey = `${key.substr(0, idx - 1)}` + `${up.toUpperCase()}`;
          } else {
            tempKey =
              `${key.substr(0, idx - 1)}` +
              `${up.toUpperCase()}` +
              `${key.substr(idx + 1)}`;
          }
        } else {
          tempKey = key; //没有下划线
        }

        // 判断属性是否是对象
        if (user[key] instanceof Object && !(user[key] instanceof Array)) {
          returnUser[tempKey] = convert(user[key]);
        } else if (user[key] instanceof Array) {
          if (user[key].length == 0 || !(user[key][0] instanceof Object)) {
            returnUser[tempKey] = user[key];
          } else {
            let tempArr = [];
            for (v of user[key]) {
              tempArr.push(convert(v));
            }
            returnUser[tempKey] = tempArr;
          }
        } else {
          returnUser[tempKey] = user[key];
          //对 A___多个下划线的情况没做处理 懒得写判断了
        }
      }
      return returnUser;
    }
  } else {
    returnUser = 0; //非对象返回0
    return returnUser;
    //取消下划线并且把下划线后的首字母转为大写
  }
}
