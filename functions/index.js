const functions = require("firebase-functions"); // ダブルクオートを使用
const pool = require("./db"); // ダブルクオートを使用

// 商品ID（バーコード）を基に商品情報を取得する関数
exports.getProductByBarcode = functions.https.onRequest((req, res) => {
  const barcode = req.query.barcode;

  if (!barcode) {
    return res.status(400).send("Barcode is required"); // ダブルクオートを使用
  }

  // SQLクエリ
  const query = "SELECT * FROM products WHERE barcode = ?"; // ダブルクオートを使用

  // クエリの実行
  pool.query(query, [barcode], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error"); // ダブルクオートを使用
    }

    if (results.length === 0) {
      return res.status(404).send("Product not found"); // ダブルクオートを使用
    }

    // 結果をJSON形式で返す
    res.json(results[0]);
  });
});
