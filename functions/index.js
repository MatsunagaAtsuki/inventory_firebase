exports.getProductByBarcode = functions.https.onCall(async (data, context) => {
  const barcode = data.barcode;

  console.log("受信したバーコード:", barcode); // デバッグ用

  if (!barcode || barcode.length < 5) {
    console.log("無効なバーコード");
    throw new functions.https.HttpsError("invalid-argument", "Invalid barcode.");
  }

  const query = "SELECT * FROM products WHERE barcode = ?";

  try {
    const [results] = await pool.promise().query(query, [barcode]);

    console.log("データベースからの結果:", results); // デバッグ用

    if (results.length === 0) {
      console.log("商品が見つかりません");
      throw new functions.https.HttpsError("not-found", "Product not found.");
    }

    return results[0]; // JSON形式で返す
  } catch (error) {
    console.error("Database error:", error.sqlMessage || error.message);
    throw new functions.https.HttpsError("internal", "Database error.");
  }
});
