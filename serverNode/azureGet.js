const { Connection, Request } = require("tedious");
const { handlingData } = require("./handlingRow");
const fs = require("fs");

// Read back end settings
const configAsText = fs.readFileSync("db.config.json", "utf8");
const allConfig = JSON.parse(configAsText); 

// Create connection to database
const config = allConfig.connection;
const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    queryDatabase();
  }
});

connection.connect();

function queryDatabase() {
  console.log("Reading rows from the Table...");
  let data = [];

  const result = new Promise((resolve, reject) => {
    const dbCallbackWithResults = (err, rowCount, rows) => {
      if (err) {
        reject(err);
      } else {
        const tr =handlingData(data);
        resolve(tr);
      }
    };
    const sqlQuery = `SELECT top 600 id, state_name, county_name, city, description from [dbo].[allcities]`;

    // Read all rows from table
    const request = new Request(sqlQuery, dbCallbackWithResults);

    request.on("row", (columns) => {
      let row = [];
      columns.forEach((column) => {
        row.push(column);
      });
      data.push(row);

    });
    connection.execSql(request);
  });
  return result;
}

module.exports = {
  queryDatabase
};