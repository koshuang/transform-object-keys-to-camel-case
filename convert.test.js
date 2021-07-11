import { toCamelCase } from "./convert"

describe("when toCamelCase is called with", () => {
  test("snake_to_camelCase, it should return snakeToCamelCase", () => {
    // Todo: This one fails, do you want to fix it?
    const result = toCamelCase("snake_to_camelCase");
    expect(result).toStrictEqual("snakeToCamelCase");
  });
  test("snake_case, it should return snakeCase", () => {
    const result = toCamelCase("snake_case");
    expect(result).toStrictEqual("snakeCase");
  });
  test("snake_to_camel_case, it should return snakeToCamelCase", () => {
    // Todo: This one fails, do you want to fix it?
    const longTest = "this_is_a_very_long_snake_case_key"
    const result = toCamelCase(longTest);
    expect(result).toStrictEqual("thisIsAVeryLongSnakeCaseKey");
  });
})
