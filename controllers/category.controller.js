import db from "../config/db.js";

// CREATE CATEGORY
export const createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name required" });
  }

  db.query(
    "INSERT INTO categories (name) VALUES (?)",
    [name],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Category already exists" });
        }
        return res.status(500).json(err);
      }

      res.json({ message: "Category created" });
    }
  );
};

// GET ALL
export const getCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// SEARCH BY WORD
export const searchCategories = (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Search query is required" });
  }

  db.query(
    "SELECT id, name FROM categories WHERE name LIKE ?",
    [`%${q}%`],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// GET BY ID
export const getCategoryById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM categories WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json(result[0]);
    }
  );
};

// UPDATE
export const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name required" });
  }

  db.query(
    "UPDATE categories SET name = ? WHERE id = ?",
    [name, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json({ message: "Category updated" });
    }
  );
};

// DELETE
export const deleteCategory = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM categories WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error deleting category:", err);
        if (
          err.code === "ER_ROW_IS_REFERENCED_2" ||
          err.code === "ER_ROW_IS_REFERENCED_1" ||
          err.code === "ER_ROW_IS_REFERENCED"
        ) {
          return res.status(409).json({
            message:
              "Cannot delete category because it has related products. Delete products first."
          });
        }
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        return res.status(200).json({ message: "Category not found" });
      }

      res.json({ message: "Category deleted" });
    }
  );
};



// ===== PRODUCT PART =====

// SEARCH PRODUCTS
export const searchProducts = (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Search query is required" });
  }

  db.query(
    "SELECT id, name, price, category_id FROM products WHERE name LIKE ?",
    [`%${q}%`],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// CREATE PRODUCT
export const createProduct = (req, res) => {
  const { categoryId } = req.params;
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Product name and price required" });
  }

  db.query(
    "SELECT id FROM categories WHERE id = ?",
    [categoryId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "Category not found" });
      }

      db.query(
        "INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)",
        [name, price, categoryId],
        (err) => {
          if (err) return res.status(500).json(err);
          res.json({ message: "Product added to category" });
        }
      );
    }
  );
};

// GET PRODUCTS OF CATEGORY
export const getProducts = (req, res) => {
  const { categoryId } = req.params;

  db.query(
    "SELECT * FROM products WHERE category_id = ?",
    [categoryId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// GET SINGLE PRODUCT
export const getSingleProduct = (req, res) => {
  const { categoryId, productId } = req.params;

  db.query(
    "SELECT * FROM products WHERE id = ? AND category_id = ?",
    [productId, categoryId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Product not found in this category" });
      }

      res.json(result[0]);
    }
  );
};

// UPDATE PRODUCT
export const updateProduct = (req, res) => {
  const { categoryId, productId } = req.params;
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price required" });
  }

  db.query(
    "UPDATE products SET name = ?, price = ? WHERE id = ? AND category_id = ?",
    [name, price, productId, categoryId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Product not found in this category" });
      }

      res.json({ message: "Product updated" });
    }
  );
};

// DELETE PRODUCT
export const deleteProduct = (req, res) => {
  const { categoryId, productId } = req.params;

  db.query(
    "DELETE FROM products WHERE id = ? AND category_id = ?",
    [productId, categoryId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Product not found in this category" });
      }

      res.json({ message: "Product deleted" });
    }
  );
};
