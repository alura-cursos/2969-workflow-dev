import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

if (process.env.ENVIRONMENT !== 'test') {
  dotenv.config({ path: '/app/.env' });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfig = {
  development: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '../test/livraria.sqlite'),
    },
    useNullAsDefault: true,
  },
};

export default dbConfig;
