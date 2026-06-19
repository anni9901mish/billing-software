import { motion } from "framer-motion";
import { Trash2, ShoppingCart } from "lucide-react";

function ItemTable({ items, removeItem }) {
  return (
    <div className="overflow-x-auto">
      <div className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-xl">
            <ShoppingCart />
          </div>

          <div>
            <p className="text-sm opacity-70 font-semibold">Current Invoice</p>
            <h2 className="text-2xl font-black">Bill Items</h2>
          </div>
        </div>

        <table className="w-full min-w-[950px] text-sm">
          <thead className="bg-white/10 backdrop-blur-xl">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Product Code</th>
              <th className="p-4">MFG Date</th>
              <th className="p-4">Expiry</th>
              <th className="p-4">Price</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Discount %</th>
              <th className="p-4">Discount Amt</th>
              <th className="p-4">Final Amount</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="10" className="p-8 text-center opacity-60 font-semibold">
                  No items added yet
                </td>
              </tr>
            ) : (
              items.map((item, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border-t border-white/10 text-center hover:bg-white/10 transition"
                >
                  <td className="p-4 font-bold">{item.name}</td>
                  <td className="p-4">{item.productCode}</td>
                  <td className="p-4">{item.mfgDate}</td>
                  <td className="p-4">{item.expiry}</td>
                  <td className="p-4">₹{item.price}</td>
                  <td className="p-4">{item.qty}</td>
                  <td className="p-4 text-yellow-300 font-bold">
                    {item.discount}%
                  </td>
                  <td className="p-4 text-red-300 font-bold">
                    ₹{item.discountAmount?.toFixed(2)}
                  </td>
                  <td className="p-4 text-green-300 font-black">
                    ₹{item.finalAmount?.toFixed(2)}
                  </td>

                  <td className="p-4">
                    <motion.button
                      whileHover={{ scale: 1.12, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(i)}
                      className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemTable;