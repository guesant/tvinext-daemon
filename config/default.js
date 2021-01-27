const { join } = require("path");

module.exports = {
  debug: true,
  db: {
    path: join(__dirname, "../db/data.json"),
  },
  api: {
    host: "0.0.0.0",
    port: 3001,
  },
};
