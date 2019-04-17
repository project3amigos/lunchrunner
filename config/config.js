require("dotenv").config();

module.exports = {
  "development": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": "lunchrunner",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "testdb",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
