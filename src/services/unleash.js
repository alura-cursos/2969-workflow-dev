import { initialize } from 'unleash-client';

// eslint-disable-next-line import/no-mutable-exports
let unleash;

if (process.env.NODE_ENV !== 'test') {
  unleash = initialize({
    url: process.env.UNLEASH_URL,
    appName: 'default',
    customHeaders: { Authorization: process.env.UNLEASH_TOKEN },
  });
}

export default unleash;
