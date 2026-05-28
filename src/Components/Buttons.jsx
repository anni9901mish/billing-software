import { FaFilePdf } from "react-icons/fa";

function Buttons({ generatePDF }) {
  return (
    <button
      onClick={generatePDF}
      className="
      flex items-center gap-3
      bg-linear-to-r from-cyan-500 to-blue-600
      hover:from-cyan-400 hover:to-blue-500
      px-8 py-4
      rounded-2xl
      text-white
      font-bold
      shadow-[0_10px_40px_rgba(0,255,255,0.3)]
      hover:scale-105
      active:scale-95
      transition-all
      duration-300
      "
    >
      <FaFilePdf className="text-2xl" />

      Download PDF
    </button>
  );
}

export default Buttons;