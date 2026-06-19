const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Inventory Backend Running 🚀");
});

app.use("/api/products", productRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});