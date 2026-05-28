import { FaTrash } from "react-icons/fa";

function ItemTable({
  items,
  removeItem,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white border border-slate-700">

        <thead className="bg-slate-800">
          <tr>
            <th className="p-3">Product</th>
            <th className="p-3">HSN</th>
            <th className="p-3">Batch</th>
            <th className="p-3">Expiry</th>
            <th className="p-3">Price</th>
            <th className="p-3">Qty</th>
            <th className="p-3">
              Discount %
            </th>
            <th className="p-3">
              Discount Amt
            </th>
            <th className="p-3">
              Final Amount
            </th>
            <th className="p-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, i) => (

            <tr
              key={i}
              className="border-b border-slate-700"
            >

              <td className="p-3">
                {item.name}
              </td>

              <td className="p-3">
                {item.hsn}
              </td>

              <td className="p-3">
                {item.batch}
              </td>

              <td className="p-3">
                {item.expiry}
              </td>

              <td className="p-3">
                Rs. {item.price}
              </td>

              <td className="p-3">
                {item.qty}
              </td>

              <td className="p-3 text-yellow-300">
                {item.discount}%
              </td>

              <td className="p-3 text-red-400">
                Rs.
                {item.discountAmount?.toFixed(
                  2
                )}
              </td>

              <td className="p-3 text-green-400">
                Rs.
                {item.finalAmount?.toFixed(
                  2
                )}
              </td>

              <td className="p-3">
                <button
                  onClick={() =>
                    removeItem(i)
                  }
                  className="
                  bg-red-500
                  px-3
                  py-2
                  rounded-lg
                  "
                >
                  <FaTrash />
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default ItemTable;