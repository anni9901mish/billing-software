import { motion } from "framer-motion";
import {
  PackageSearch,
  IndianRupee,
  Hash,
  BadgePercent,
  Barcode,
  CalendarDays,
  PlusCircle,
} from "lucide-react";

function ItemForm({
  products = [],
  name,
  setName,
  price,
  setPrice,
  qty,
  setQty,
  discount,
  setDiscount,
  productCode,
  setProductCode,
  mfgDate,
  setMfgDate,
  expiry,
  setExpiry,
  addItem,
  darkMode,
}) {
  const inputClass = darkMode
    ? "bg-white/10 border-white/15 text-white placeholder-slate-400"
    : "bg-white/80 border-orange-200 text-slate-900 placeholder-slate-500";

  const fieldBox =
    "flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_18px_45px_rgba(0,0,0,0.18)]";

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm opacity-70 font-semibold">Billing Items</p>
        <h2 className="text-2xl font-black">Add Product to Bill</h2>
      </div>

      <div className="grid md:grid-cols-4 gap-5">
        <motion.div
          whileHover={{ y: -4, rotateX: 5 }}
          className={`${fieldBox} ${inputClass}`}
        >
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white shadow-lg">
            <PackageSearch size={20} />
          </div>

          <select
            value={name}
            onChange={(e) => {
              const selectedProduct = products.find(
                (p) => p.name === e.target.value
              );

              if (selectedProduct) {
                setName(selectedProduct.name);
                setPrice(selectedProduct.price);
                setProductCode(selectedProduct.product_code || "");
                setMfgDate(selectedProduct.mfg_date || "");
                setExpiry(selectedProduct.expiry || "");
              }
            }}
            className="w-full bg-transparent outline-none font-semibold"
          >
            <option value="" className="text-black">
              Select Product
            </option>

            {products.map((product) => (
              <option key={product.id} value={product.name} className="text-black">
                {product.name} - Stock: {product.stock}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div whileHover={{ y: -4, rotateX: 5 }} className={`${fieldBox} ${inputClass}`}>
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-green-400 to-lime-500 flex items-center justify-center text-white shadow-lg">
            <IndianRupee size={20} />
          </div>
          <input
            type="number"
            placeholder="Price"
            value={price}
            readOnly
            className="w-full bg-transparent outline-none font-semibold"
          />
        </motion.div>

        <motion.div whileHover={{ y: -4, rotateX: 5 }} className={`${fieldBox} ${inputClass}`}>
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white shadow-lg">
            <Hash size={20} />
          </div>
          <input
            type="number"
            placeholder="Quantity"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-full bg-transparent outline-none font-semibold"
          />
        </motion.div>

        <motion.div whileHover={{ y: -4, rotateX: 5 }} className={`${fieldBox} ${inputClass}`}>
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white shadow-lg">
            <BadgePercent size={20} />
          </div>
          <input
            type="number"
            placeholder="Discount %"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full bg-transparent outline-none font-semibold"
          />
        </motion.div>

        <motion.div whileHover={{ y: -4, rotateX: 5 }} className={`${fieldBox} ${inputClass}`}>
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-fuchsia-400 to-purple-500 flex items-center justify-center text-white shadow-lg">
            <Barcode size={20} />
          </div>
          <input
            type="text"
            placeholder="Product Code"
            value={productCode}
            readOnly
            className="w-full bg-transparent outline-none font-semibold"
          />
        </motion.div>

        <motion.div whileHover={{ y: -4, rotateX: 5 }} className={`${fieldBox} ${inputClass}`}>
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white shadow-lg">
            <CalendarDays size={20} />
          </div>
          <input
            type="text"
            placeholder="MFG Date"
            value={mfgDate}
            readOnly
            className="w-full bg-transparent outline-none font-semibold"
          />
        </motion.div>

        <motion.div whileHover={{ y: -4, rotateX: 5 }} className={`${fieldBox} ${inputClass}`}>
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
            <CalendarDays size={20} />
          </div>
          <input
            type="text"
            placeholder="Expiry"
            value={expiry}
            readOnly
            className="w-full bg-transparent outline-none font-semibold"
          />
        </motion.div>

        <motion.button
          whileHover={{
            scale: 1.05,
            y: -4,
            boxShadow: "0 25px 70px rgba(34,197,94,0.45)",
          }}
          whileTap={{ scale: 0.94 }}
          onClick={addItem}
          className="
            flex items-center justify-center gap-3
            rounded-2xl
            bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-300
            text-black font-black
            shadow-[0_18px_45px_rgba(34,197,94,0.35)]
          "
        >
          <PlusCircle size={22} />
          Add Item
        </motion.button>
      </div>
    </div>
  );
}

export default ItemForm;