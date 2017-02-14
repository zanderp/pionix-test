const databaseName = 'pionix';

module.exports = {
  development: {
    client: 'postgresql',
    connection: `postgres://postgres:pionix@localhost:5432/${databaseName}`,
    pool: {
      min: 1,
      max: 1
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  test: {
    client: 'postgresql',
    connection: `postgres://postgres:pionix@localhost:5432/${databaseName}_test`,
    pool: {
      min: 1,
      max: 1
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }
};
