import { motion } from "framer-motion";
import { WalletCards, ReceiptText } from "lucide-react";

function Summary({
  subtotal,
  totalDiscount,
  taxable,
  cgst,
  sgst,
  total,
  gstRate,
  darkMode,
}) {
  const cardClass = darkMode
    ? "bg-white/10 border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
    : "bg-white/70 border-white/80 shadow-[0_30px_90px_rgba(251,146,60,0.25)]";

  const rowClass =
    "flex justify-between items-center p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl";

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-[2rem] border backdrop-blur-2xl p-6 ${cardClass}`}
    >
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-green-500/25 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-lime-500 flex items-center justify-center shadow-xl text-white">
            <WalletCards />
          </div>

          <div>
            <p className="text-sm opacity-70 font-semibold">Payment Overview</p>
            <h2 className="text-2xl font-black">Billing Summary</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className={rowClass}>
            <span className="opacity-75 font-semibold">Subtotal</span>
            <span className="font-black">₹{subtotal.toFixed(2)}</span>
          </div>

          <div className={rowClass}>
            <span className="opacity-75 font-semibold">Total Discount</span>
            <span className="font-black text-red-300">
              - ₹{totalDiscount.toFixed(2)}
            </span>
          </div>

          <div className={rowClass}>
            <span className="opacity-75 font-semibold">Taxable Amount</span>
            <span className="font-black text-yellow-300">
              ₹{taxable.toFixed(2)}
            </span>
          </div>

          <div className={rowClass}>
            <span className="opacity-75 font-semibold">GST Rate</span>
            <span className="font-black text-cyan-300">{gstRate}%</span>
          </div>

          <div className={rowClass}>
            <span className="opacity-75 font-semibold">CGST ({gstRate / 2}%)</span>
            <span className="font-black text-cyan-300">₹{cgst.toFixed(2)}</span>
          </div>

          <div className={rowClass}>
            <span className="opacity-75 font-semibold">SGST ({gstRate / 2}%)</span>
            <span className="font-black text-cyan-300">₹{sgst.toFixed(2)}</span>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
            mt-6
            rounded-[2rem]
            bg-gradient-to-r
            from-emerald-400
            via-lime-400
            to-yellow-300
            text-black
            p-6
            shadow-[0_25px_70px_rgba(34,197,94,0.35)]
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div className="flex items-center gap-3">
            <ReceiptText />
            <span className="text-lg font-black">Final Total</span>
          </div>

          <span className="text-3xl font-black">₹{total.toFixed(2)}</span>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Summary;