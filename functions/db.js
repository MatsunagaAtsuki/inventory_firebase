const mysql = require("mysql"); // ダブルクオートを使用

// MySQLの接続設定
const dbConfig = {
  host: "localhost", // ダブルクオートを使用
  user: "root", // ダブルクオートを使用
  password: "P@ssw0rd", // ダブルクオートを使用
  database: "inventory_management", // ダブルクオートを使用
};

// プール接続を作成
const pool = mysql.createPool(dbConfig);

// プールをエクスポート
module.exports = pool;

