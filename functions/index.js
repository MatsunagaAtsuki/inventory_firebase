const functions = require("firebase-functions");
const admin = require("firebase-admin");
const pool = require("./mysqlPool"); // 接続プールのインポート

admin.initializeApp();

exports.getDataFromMySQL = functions.https.onRequest((req, res) => {
  // クエリをプールを使って実行
  pool.query('SELECT * FROM your_table_name', (error, results, fields) => {
    if (error) {
      res.status(500).send("Error fetching data from MySQL: " + error);
      return;
    }
    res.status(200).send(results); // データをクライアントに返す
  });
});
