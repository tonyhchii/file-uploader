const { Pool } = require("pool");
const poolInstance = new Pool({
  host: "localhost",
  user: "tonyhuang",
  database: "fileuploader",
  password: "123qwe",
  port: 5432,
});

module.exports = poolInstance;
