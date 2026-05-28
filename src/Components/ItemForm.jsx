function ItemForm({
  name,
  setName,

  price,
  setPrice,

  qty,
  setQty,

  discount,
  setDiscount,

  hsn,
  setHsn,

  batch,
  setBatch,

  expiry,
  setExpiry,

  addItem,
}) {
  return (
    <div
      className="
      grid
      md:grid-cols-4
      gap-4
      "
    >

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="
        p-4
        rounded-xl
        bg-slate-800
        text-white
        outline-none
        "
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
        className="
        p-4
        rounded-xl
        bg-slate-800
        text-white
        outline-none
        "
      />

      <input
        type="number"
        placeholder="Qty"
        value={qty}
        onChange={(e) =>
          setQty(e.target.value)
        }
        className="
        p-4
        rounded-xl
        bg-slate-800
        text-white
        outline-none
        "
      />

      <input
        type="number"
        placeholder="Discount %"
        value={discount}
        onChange={(e) =>
          setDiscount(e.target.value)
        }
        className="
        p-4
        rounded-xl
        bg-slate-800
        text-white
        outline-none
        "
      />

      <input
        type="text"
        placeholder="HSN"
        value={hsn}
        onChange={(e) =>
          setHsn(e.target.value)
        }
        className="
        p-4
        rounded-xl
        bg-slate-800
        text-white
        outline-none
        "
      />

      <input
        type="text"
        placeholder="Batch"
        value={batch}
        onChange={(e) =>
          setBatch(e.target.value)
        }
        className="
        p-4
        rounded-xl
        bg-slate-800
        text-white
        outline-none
        "
      />

      <input
        type="text"
        placeholder="Expiry"
        value={expiry}
        onChange={(e) =>
          setExpiry(e.target.value)
        }
        className="
        p-4
        rounded-xl
        bg-slate-800
        text-white
        outline-none
        "
      />

      <button
        onClick={addItem}
        className="
        bg-cyan-500
        hover:bg-cyan-600
        rounded-xl
        font-bold
        transition-all
        "
      >
        Add Item
      </button>

    </div>
  );
}

export default ItemForm;