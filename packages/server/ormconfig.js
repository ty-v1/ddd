const databaseURL = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env.DATABASE_URL;
    case 'development':
      return 'mysql://root:password@localhost:5432/ddd';
  }
})();

module.exports = {
  type: 'mysql',
  url: databaseURL,
  logging: false,
  entities: ['src/repository/record/**/*.ts'],
  migrations: ['src/migrations/*.ts'],
  cli: {
    entitiesDir: './src/repository/record',
    migrationsDir: './src/migrations',
  },
};
