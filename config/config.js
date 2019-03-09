module.exports = {
  development: {
    username: "root",
    // make sure to set this env variable in your .env file
    password: process.env.LOCAL_MYSQL_PASSWORD,
    database: "PhillyMeIn",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    /* eslint-disable-next-line camelcase */
    use_env_variable: JAWSDB_URL,
    dialect: "mysql"
  }
};
