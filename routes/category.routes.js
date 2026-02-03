import express from "express";
import * as c from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", c.createCategory);
router.get("/", c.getCategories);
router.get("/search", c.searchCategories);
router.get("/:id", c.getCategoryById);
router.put("/:id", c.updateCategory);
router.delete("/:id", c.deleteCategory);

export default router;
