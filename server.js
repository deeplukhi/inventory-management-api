import express from "express";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./swagger.js";

const app = express();

app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

app.listen(3000, () => {
  console.log("server running on 3000");
});
