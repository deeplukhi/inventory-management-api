import express from "express";
import * as p from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", p.createProduct);
router.get("/", p.getAllProducts);
router.get("/search", p.searchProducts);
router.get("/:id", p.getProductById);
router.put("/:id", p.updateProduct);
router.delete("/:id", p.deleteProduct);

export default router;