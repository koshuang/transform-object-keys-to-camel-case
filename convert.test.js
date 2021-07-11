import { toCamelCase } from "./convert"

describe("when toCamelCase is called with", () => {
  test("snake_to_camelCase, it should return snakeToCamelCase", () => {
    const result = toCamelCase("snake_to_camelCase");
    expect(result).toStrictEqual("snakeToCamelCase");
  });
})
