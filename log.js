export const log = {
  enabled: true,
  level: 'DEBUG',

  debug: (...args) => log.enabled && console.log(...args),
};
