import { convert } from "./convert"

describe("when convert is called with", () => {
  test("user, it should return new user object with camelcase keys", () => {
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
      ],
      cell_phone_id: 1
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
      ],
      cellPhoneId: 1
    };

    const result = convert(user);

    expect(result).toEqual(expectedUser);
  });
})
