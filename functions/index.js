const functions = require("firebase-functions");
const pool = require("./db");

exports.getProductByBarcode = functions.https.onCall(async (data, context) => {
  console.log("リクエスト受信:", data); // リクエストデータをログに出力

  const barcode = data.barcode; // 修正: req.query ではなく data.barcode を使う
  if (!barcode) {
    console.error("エラー: バーコードが提供されていません");
    throw new functions.https.HttpsError("invalid-argument", "Barcode is required");
  }

  const query = "SELECT * FROM products WHERE barcode = ?";
  console.log(`実行するSQL: ${query}, パラメータ: ${barcode}`);

  return new Promise((resolve, reject) => {
    pool.query(query, [barcode], (err, results) => {
      if (err) {
        console.error("データベースエラー:", err);
        reject(new functions.https.HttpsError("internal", "Database error"));
        return;
      }

      console.log("クエリ結果:", results);

      if (results.length === 0) {
        console.warn("警告: バーコードに該当する商品が見つかりません");
        reject(new functions.https.HttpsError("not-found", "Product not found"));
        return;
      }

      console.log("商品情報:", results[0]);
      resolve(results[0]);
    });
  });
});
