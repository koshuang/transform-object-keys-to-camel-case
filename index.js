import { convert } from './convert';

const user = {
  id: 1,
  name: 'User 1',
  account_ids: [1, 2, 3],
  role_id: 1,
  account: {
    category_id: 1
  },
  groups: [
    { group_id: 1, name: 'admin' },
  ]
};

const expectedUser = {
  id: 1,
  name: 'User 1',
  accountIds: [1, 2, 3],
  roleId: 1,
  account: {
    categoryId: 1
  },
  groups: [
    { groupId: 1, name: 'admin' },
  ]
};

const actual = convert(user);

const actualJSON = JSON.stringify(actual);
const expectedUserJSON = JSON.stringify(expectedUser);

console.log(actualJSON === expectedUserJSON);
