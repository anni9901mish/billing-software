import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

function Buttons({ generatePDF }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.07,
        y: -5,
        rotateX: 8,
        boxShadow: "0 30px 80px rgba(34,197,94,0.45)",
      }}
      whileTap={{ scale: 0.94 }}
      onClick={generatePDF}
      className="
        group
        relative
        overflow-hidden
        flex
        items-center
        gap-4
        px-10
        py-5
        rounded-[1.5rem]
        bg-gradient-to-r
        from-emerald-400
        via-lime-400
        to-yellow-300
        text-black
        font-black
        shadow-[0_22px_60px_rgba(34,197,94,0.35)]
        border
        border-white/40
      "
    >
      <span className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>

      <span className="relative h-12 w-12 rounded-2xl bg-black/10 flex items-center justify-center shadow-inner">
        <FileDown size={24} />
      </span>

      <span className="relative text-lg">Generate Premium PDF</span>
    </motion.button>
  );
}

export default Buttons;