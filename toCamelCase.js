export function toCamelCase(key) {
  const [first, ...rest] = key.split("_");
  const camelCased = rest.map((it) => it[0].toUpperCase() + it.slice(1));
  return first + camelCased.join("");
}
