import db from "../config/db.js";

// CREATE PRODUCT
export const createProduct = (req, res) => {
  const { name, price, category_id } = req.body;

  if (!name || !price || !category_id) {
    return res.status(400).json({
      success: false,
      message: "name, price and category_id required"
    });
  }

  db.query(
    "INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)",
    [name, price, category_id],
    (err) => {
      if (err)
        return res.status(500).json({ success: false, error: err });

      res.json({
        success: true,
        message: "Product created"
      });
    }
  );
};

// GET ALL
export const getAllProducts = (req, res) => {
  db.query(
    "SELECT * FROM products",
    (err, result) => {
      if (err)
        return res.status(500).json({ success: false, error: err });

      res.json({ success: true, data: result });
    }
  );
};

// GET BY ID
export const getProductById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, result) => {
      if (err)
        return res.status(500).json({ success: false, error: err });

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      res.json({ success: true, data: result[0] });
    }
  );
};

// UPDATE
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, category_id } = req.body;

  db.query(
    "UPDATE products SET name=?, price=?, category_id=? WHERE id=?",
    [name, price, category_id, id],
    (err, result) => {
      if (err)
        return res.status(500).json({ success: false, error: err });

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      res.json({
        success: true,
        message: "Product updated"
      });
    }
  );
};

// DELETE
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM products WHERE id=?",
    [id],
    (err, result) => {
      if (err)
        return res.status(500).json({ success: false, error: err });

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      res.json({
        success: true,
        message: "Product deleted"
      });
    }
  );
};

// SEARCH
export const searchProducts = (req, res) => {
  const { q } = req.query;

  db.query(
    "SELECT * FROM products WHERE name LIKE ?",
    [`%${q}%`],
    (err, result) => {
      if (err)
        return res.status(500).json({ success: false, error: err });

      res.json({ success: true, data: result });
    }
  );
};