import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { numberToWords } from "./utils/numberToWords";

import BillingForm from "./components/BillingForm";
import ItemForm from "./components/ItemForm";
import ItemTable from "./components/ItemTable";
import Summary from "./components/Summary";
import Buttons from "./components/Buttons";

function App() {

  // BILL INFO
  const [billNo, setBillNo] =
    useState("");

  const [customer, setCustomer] =
    useState("");

  // ITEMS
  const [items, setItems] = useState(
    []
  );

  // PRODUCT INPUTS
  const [name, setName] = useState("");

  const [price, setPrice] =
    useState("");

  const [qty, setQty] = useState("");

  const [discount, setDiscount] =
    useState("");

  const [hsn, setHsn] = useState("");

  const [batch, setBatch] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  // GST FIXED
  const gstRate = 5;

  // ADD ITEM
  const addItem = () => {

    if (!name || !price || !qty) {
      alert("Fill all fields");
      return;
    }

    const itemTotal =
      Number(price) * Number(qty);

    const discountAmount =
      (itemTotal * Number(discount || 0)) /
      100;

    const finalAmount =
      itemTotal - discountAmount;

    const newItem = {
      name,
      price: Number(price),
      qty: Number(qty),

      discount:
        Number(discount || 0),

      discountAmount,

      finalAmount,

      hsn,
      batch,
      expiry,
    };

    setItems([...items, newItem]);

    // CLEAR INPUTS
    setName("");
    setPrice("");
    setQty("");
    setDiscount("");
    setHsn("");
    setBatch("");
    setExpiry("");
  };

  // DELETE ITEM
  const removeItem = (index) => {

    const updatedItems = items.filter(
      (_, i) => i !== index
    );

    setItems(updatedItems);
  };

  // CALCULATIONS

  // SUBTOTAL
  const subtotal = items.reduce(
    (acc, item) =>
      acc + item.price * item.qty,
    0
  );

  // TOTAL DISCOUNT
  const totalDiscount = items.reduce(
    (acc, item) =>
      acc + item.discountAmount,
    0
  );

  // TAXABLE
  const taxable =
    subtotal - totalDiscount;

  // GST
  const cgst =
    (taxable * gstRate) / 2 / 100;

  const sgst =
    (taxable * gstRate) / 2 / 100;

  // FINAL TOTAL
  const total = taxable + cgst + sgst;

  // PDF
  const generatePDF = () => {

    const doc = new jsPDF();

    // TITLE
    doc.setFontSize(22);

    doc.text(
      "ESTIMATE (CREDIT)",
      60,
      20
    );

    // BILL DETAILS
    doc.setFontSize(12);

    doc.text(
      `Bill No: ${billNo}`,
      20,
      40
    );

    doc.text(
      `Customer: ${customer}`,
      20,
      50
    );

    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      20,
      60
    );

    // TABLE
    autoTable(doc, {

      startY: 80,

      head: [[
        "Product",
        "HSN",
        "Batch",
        "Expiry",
        "Price",
        "Qty",
        "Discount %",
        "Discount Amt",
        "Final Amount",
      ]],

      body: items.map((item) => [

        item.name,
        item.hsn,
        item.batch,
        item.expiry,
        item.price,
        item.qty,

        item.discount + "%",

        item.discountAmount.toFixed(
          2
        ),

        item.finalAmount.toFixed(
          2
        ),

      ]),
    });

    // FINAL POSITION
    const finalY =
      doc.lastAutoTable.finalY + 20;

    // TOTALS
    doc.text(
      `Subtotal: Rs. ${subtotal.toFixed(
        2
      )}`,
      20,
      finalY
    );

    doc.text(
      `Total Discount: Rs. ${totalDiscount.toFixed(
        2
      )}`,
      20,
      finalY + 10
    );

    doc.text(
      `Taxable Amount: Rs. ${taxable.toFixed(
        2
      )}`,
      20,
      finalY + 20
    );

    doc.text(
      `CGST (2.5%): Rs. ${cgst.toFixed(
        2
      )}`,
      20,
      finalY + 30
    );

    doc.text(
      `SGST (2.5%): Rs. ${sgst.toFixed(
        2
      )}`,
      20,
      finalY + 40
    );

    doc.setFontSize(16);

    doc.text(
      `Final Total: Rs. ${total.toFixed(
        2
      )}`,
      20,
      finalY + 55
    );

    // AMOUNT IN WORDS
    doc.setFontSize(12);

    doc.text(
      `Amount in Words: ${numberToWords(
        Math.round(total)
      )} Rupees Only`,
      20,
      finalY + 75
    );

    // SAVE PDF
    doc.save(`Bill-${billNo}.pdf`);
  };

  return (

    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-black
      text-white
      p-8
      "
    >

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}

        <h1
          className="
          text-6xl
          font-black
          text-center
          mb-10
          bg-gradient-to-r
          from-cyan-400
          to-blue-500
          bg-clip-text
          text-transparent
          drop-shadow-2xl
          "
        >
          Billing Software
        </h1>

        {/* MAIN CARD */}

        <div
          className="
          bg-white/10
          backdrop-blur-lg
          rounded-3xl
          p-8
          shadow-2xl
          border
          border-white/10
          "
        >

          {/* BILL FORM */}

          <div className="mb-8">

            <BillingForm
              billNo={billNo}
              setBillNo={setBillNo}
              customer={customer}
              setCustomer={setCustomer}
            />

          </div>

          {/* ITEM FORM */}

          <div
            className="
            bg-slate-900/70
            p-6
            rounded-3xl
            shadow-2xl
            border
            border-slate-700
            mb-8
            "
          >

            <ItemForm
              name={name}
              setName={setName}

              price={price}
              setPrice={setPrice}

              qty={qty}
              setQty={setQty}

              discount={discount}
              setDiscount={setDiscount}

              hsn={hsn}
              setHsn={setHsn}

              batch={batch}
              setBatch={setBatch}

              expiry={expiry}
              setExpiry={setExpiry}

              addItem={addItem}
            />

          </div>

          {/* BUTTON */}

          <div className="flex justify-center mb-10">

            <Buttons
              generatePDF={generatePDF}
            />

          </div>

          {/* TABLE */}

          <div
            className="
            overflow-x-auto
            rounded-3xl
            border
            border-slate-700
            shadow-2xl
            "
          >

            <ItemTable
              items={items}
              removeItem={removeItem}
            />

          </div>

          {/* SUMMARY */}

          <Summary
            subtotal={subtotal}
            totalDiscount={totalDiscount}
            taxable={taxable}
            cgst={cgst}
            sgst={sgst}
            total={total}
          />

        </div>
      </div>
    </div>
  );
}

export default App;