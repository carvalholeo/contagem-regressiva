
const {
  DB_DATABASE: database = 'count_down',
  DB_USERNAME: username = 'root',
  DB_PASSWORD: password = '',
  DB_CLIENT: client = 'mysql',
  DB_HOST: host = 'localhost',
  DB_PORT: port = 3306,
} = process.env;

module.exports = {
  development: {
    username: username,
    password: password,
    database: database,
    host: host,
    port: Number(port),
    dialect: client,
  },
  stage: {
    username: username,
    password: password,
    database: database,
    host: host,
    port: Number(port),
    dialect: client,
  },
  test: {
    username: username,
    password: password,
    database: database,
    host: host,
    port: Number(port),
    dialect: client,
  },
  production: {
    username: username,
    password: password,
    database: database,
    host: host,
    port: Number(port),
    dialect: client,
  },
};