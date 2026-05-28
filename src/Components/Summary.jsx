function Summary({
  subtotal,
  totalDiscount,
  taxable,
  cgst,
  sgst,
  total,
}) {
  return (
    <div
      className="
      mt-10
      bg-slate-900
      p-8
      rounded-3xl
      shadow-2xl
      border
      border-slate-700
      "
    >

      <div className="space-y-5">

        {/* SUBTOTAL */}

        <div
          className="
          flex
          justify-between
          text-lg
          text-white
          "
        >
          <span>
            Subtotal
          </span>

          <span>
            Rs.
            {subtotal.toFixed(2)}
          </span>
        </div>

        {/* TOTAL DISCOUNT */}

        <div
          className="
          flex
          justify-between
          text-lg
          text-red-400
          font-bold
          "
        >
          <span>
            Total Discount
          </span>

          <span>
            - Rs.
            {totalDiscount.toFixed(
              2
            )}
          </span>
        </div>

        {/* TAXABLE */}

        <div
          className="
          flex
          justify-between
          text-lg
          text-yellow-300
          "
        >
          <span>
            Taxable Amount
          </span>

          <span>
            Rs.
            {taxable.toFixed(2)}
          </span>
        </div>

        {/* CGST */}

        <div
          className="
          flex
          justify-between
          text-lg
          text-cyan-300
          "
        >
          <span>
            CGST (2.5%)
          </span>

          <span>
            Rs.
            {cgst.toFixed(2)}
          </span>
        </div>

        {/* SGST */}

        <div
          className="
          flex
          justify-between
          text-lg
          text-cyan-300
          "
        >
          <span>
            SGST (2.5%)
          </span>

          <span>
            Rs.
            {sgst.toFixed(2)}
          </span>
        </div>

        <hr className="border-slate-700" />

        {/* FINAL TOTAL */}

        <div
          className="
          flex
          justify-between
          text-3xl
          font-black
          text-green-400
          "
        >
          <span>
            Final Total
          </span>

          <span>
            Rs.
            {total.toFixed(2)}
          </span>
        </div>

      </div>

    </div>
  );
}

export default Summary;