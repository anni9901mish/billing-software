import { motion } from "framer-motion";
import { Receipt, User, Percent } from "lucide-react";

function BillingForm({
  billNo,
  setBillNo,
  customer,
  setCustomer,
  gstRate,
  setGstRate,
  darkMode,
}) {
  const inputClass = darkMode
    ? "bg-white/10 border-white/15 text-white placeholder-slate-400"
    : "bg-white/80 border-orange-200 text-slate-900 placeholder-slate-500";

  const fields = [
    {
      icon: <Receipt size={20} />,
      placeholder: "Bill Number",
      value: billNo,
      onChange: setBillNo,
      type: "text",
    },
    {
      icon: <User size={20} />,
      placeholder: "Customer Name",
      value: customer,
      onChange: setCustomer,
      type: "text",
    },
    {
      icon: <Percent size={20} />,
      placeholder: "GST Rate %",
      value: gstRate,
      onChange: setGstRate,
      type: "number",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm opacity-70 font-semibold">Invoice Setup</p>
        <h2 className="text-2xl font-black">Billing Details</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {fields.map((field, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4, rotateX: 5 }}
            whileFocus={{ scale: 1.02 }}
            className={`
              flex items-center gap-3
              p-4 rounded-2xl border
              backdrop-blur-2xl
              shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_18px_45px_rgba(0,0,0,0.2)]
              ${inputClass}
            `}
          >
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-lg">
              {field.icon}
            </div>

            <input
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) =>
                field.type === "number"
                  ? field.onChange(Number(e.target.value))
                  : field.onChange(e.target.value)
              }
              className="w-full bg-transparent outline-none font-semibold"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BillingForm;