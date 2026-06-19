const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

// GET all products
router.get("/", async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({
      message: "User ID is required",
    });
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", user_id)
    .order("id", { ascending: true });

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
});

// ADD product
router.post("/", async (req, res) => {
  const { name, price, stock, productCode, mfgDate, expiry, user_id } = req.body;

 if (!name || !price || !stock || !user_id) {
  return res.status(400).json({
    message: "All fields required",
  });
}
  const { data, error } = await supabase
    .from("products")
    .insert([
      {
  name,
  price: Number(price),
  stock: Number(stock),
  product_code: productCode || "",
  mfg_date: mfgDate || "",
  expiry: expiry || "",
  user_id,
}
    ])
    .select();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json(data[0]);
});

// UPDATE product
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const { data, error } = await supabase
    .from("products")
    .update(req.body)
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({
    message: "Product updated successfully",
    product: data[0],
  });
});

// DELETE product
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({
    message: "Product deleted successfully",
  });
});

module.exports = router;