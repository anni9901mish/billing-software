import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, PackagePlus, LogOut } from "lucide-react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import LoginPage from "./Components/LoginPage";
import Dashboard from "./Components/Dashboard";
import BillingForm from "./Components/BillingForm";
import ItemForm from "./Components/ItemForm";
import ItemTable from "./Components/ItemTable";
import Summary from "./Components/Summary";
import Buttons from "./Components/Buttons";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);

  const [billNo, setBillNo] = useState("");
  const [customer, setCustomer] = useState("");
  const [gstRate, setGstRate] = useState(5);

  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    productCode: "",
    mfgDate: "",
    expiry: "",
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [discount, setDiscount] = useState("");
  const [productCode, setProductCode] = useState("");
  const [mfgDate, setMfgDate] = useState("");
  const [expiry, setExpiry] = useState("");

  useEffect(() => {
    if (user) {
      fetchProducts(user);
    }
  }, [user]);

  const fetchProducts = async (currentUser = user) => {
    if (!currentUser) return;

    try {
      const res = await axios.get(
        `https://billing-software-7gdo.onrender.com/api/products?user_id=${currentUser.id}`
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      alert("Products could not be fetched!");
    }
  };

  const addProduct = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Product name, price and stock required");
      return;
    }

    try {
      await axios.post("https://billing-software-7gdo.onrender.com/api/products", {
        ...newProduct,
        user_id: user.id,
      });

      setNewProduct({
        name: "",
        price: "",
        stock: "",
        productCode: "",
        mfgDate: "",
        expiry: "",
      });

      await fetchProducts(user);
      alert("Product added successfully");
    } catch (error) {
      console.log(error);
      alert("Product add nahi ho paaya");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://billing-software-7gdo.onrender.com/api/products/${id}`);
      await fetchProducts(user);
      alert("Product deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Product delete nahi ho paaya");
    }
  };

  const addItem = () => {
    if (!name || !price || !qty) {
      alert("Fill all fields");
      return;
    }

    const selectedProduct = products.find((product) => product.name === name);

    if (!selectedProduct) {
      alert("Product not found");
      return;
    }

    if (Number(qty) > selectedProduct.stock) {
      alert(`Only ${selectedProduct.stock} stock available`);
      return;
    }

    const itemTotal = Number(price) * Number(qty);
    const discountAmount = (itemTotal * Number(discount || 0)) / 100;
    const finalAmount = itemTotal - discountAmount;

    const newItem = {
      name,
      price: Number(price),
      qty: Number(qty),
      discount: Number(discount || 0),
      discountAmount,
      finalAmount,
      productCode,
      mfgDate,
      expiry,
    };

    setItems([...items, newItem]);

    setProducts(
      products.map((product) =>
        product.name === name
          ? { ...product, stock: Number(product.stock) - Number(qty) }
          : product
      )
    );

    setName("");
    setPrice("");
    setQty("");
    setDiscount("");
    setProductCode("");
    setMfgDate("");
    setExpiry("");
  };

  const removeItem = (index) => {
    const itemToRemove = items[index];

    setItems(items.filter((_, i) => i !== index));

    setProducts(
      products.map((product) =>
        product.name === itemToRemove.name
          ? {
              ...product,
              stock: Number(product.stock) + Number(itemToRemove.qty),
            }
          : product
      )
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const totalDiscount = items.reduce(
    (acc, item) => acc + item.discountAmount,
    0
  );

  const taxable = subtotal - totalDiscount;
  const cgst = (taxable * gstRate) / 2 / 100;
  const sgst = (taxable * gstRate) / 2 / 100;
  const total = taxable + cgst + sgst;

  const generatePDF = () => {
    if (items.length === 0) {
      alert("Please add items first");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 28, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("TAX INVOICE", pageWidth / 2, 12, { align: "center" });

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Retail Inventory Manager", pageWidth / 2, 20, {
      align: "center",
    });

    doc.setTextColor(0, 0, 0);
    doc.setDrawColor(220, 220, 220);
    doc.roundedRect(14, 38, 182, 34, 3, 3);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Bill Details", 18, 47);

    doc.setFont("helvetica", "normal");
    doc.text(`Bill No: ${billNo || "N/A"}`, 18, 58);
    doc.text(`Customer: ${customer || "N/A"}`, 18, 66);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 130, 58);
    doc.text(`GST Rate: ${gstRate}%`, 130, 66);

    autoTable(doc, {
      startY: 84,
      head: [
        [
          "Product",
          "Product Code",
          "MFG Date",
          "Expiry",
          "Price",
          "Qty",
          "Disc %",
          "Disc Amt",
          "Final Amt",
        ],
      ],
      body: items.map((item) => [
        item.name,
        item.productCode,
        item.mfgDate,
        item.expiry,
        `Rs. ${item.price}`,
        item.qty,
        `${item.discount}%`,
        `Rs. ${item.discountAmount.toFixed(2)}`,
        `Rs. ${item.finalAmount.toFixed(2)}`,
      ]),
      theme: "grid",
      headStyles: {
        fillColor: [15, 23, 42],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: 3,
      },
    });

    const finalY = doc.lastAutoTable.finalY + 12;

    doc.setDrawColor(220, 220, 220);
    doc.roundedRect(115, finalY, 80, 58, 3, 3);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Summary", 120, finalY + 8);

    doc.setFont("helvetica", "normal");
    doc.text(`Subtotal: Rs. ${subtotal.toFixed(2)}`, 120, finalY + 18);
    doc.text(`Discount: Rs. ${totalDiscount.toFixed(2)}`, 120, finalY + 26);
    doc.text(`Taxable: Rs. ${taxable.toFixed(2)}`, 120, finalY + 34);
    doc.text(`CGST (${gstRate / 2}%): Rs. ${cgst.toFixed(2)}`, 120, finalY + 42);
    doc.text(`SGST (${gstRate / 2}%): Rs. ${sgst.toFixed(2)}`, 120, finalY + 50);

    doc.setFillColor(22, 163, 74);
    doc.roundedRect(115, finalY + 60, 80, 12, 3, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text(`Final Total: Rs. ${total.toFixed(2)}`, 120, finalY + 68);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Amount in Words:", 14, finalY + 20);

    doc.setFont("helvetica", "normal");
    doc.text(`${numberToWords(Math.round(total))} Rupees Only`, 14, finalY + 28);

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("This is a computer-generated bill.", pageWidth / 2, 285, {
      align: "center",
    });

    doc.save(`Bill-${billNo || Date.now()}.pdf`);
  };

  const logoutUser = () => {
    setUser(null);
    setProducts([]);
    setItems([]);
    setBillNo("");
    setCustomer("");
  };

  const pageClass = darkMode
    ? "from-[#020617] via-[#0f172a] to-black text-white"
    : "from-orange-50 via-rose-50 to-amber-100 text-slate-950";

  const shellClass = darkMode
    ? "bg-white/10 border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
    : "bg-white/65 border-white/80 shadow-[0_40px_120px_rgba(251,146,60,0.25)]";

  const panelClass = darkMode
    ? "bg-white/10 border-white/15"
    : "bg-white/70 border-white/80";

  const inputClass = darkMode
    ? "bg-white/10 border-white/15 text-white placeholder-slate-400"
    : "bg-white/80 border-orange-200 text-slate-900 placeholder-slate-500";

  const fieldLabels = {
    name: "Product Name",
    price: "Price",
    stock: "Stock",
    productCode: "Product Code",
    mfgDate: "MFG Date",
    expiry: "Expiry Date",
  };

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <div className={`min-h-screen overflow-hidden bg-gradient-to-br ${pageClass} p-6 md:p-8`}>
      <div className="fixed -top-32 -left-32 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl" />
      <div className="fixed top-20 -right-32 h-96 w-96 rounded-full bg-cyan-500/25 blur-3xl" />
      <div className="fixed bottom-0 left-1/3 h-96 w-96 rounded-full bg-lime-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <nav className="flex items-center justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.4em] uppercase opacity-70">
              Inventory Suite
            </p>
            <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-cyan-300 via-lime-300 to-yellow-300 bg-clip-text text-transparent">
              Retail Inventory Manager
            </h1>
            <p className="mt-2 text-sm opacity-70 break-all">
              Logged in: {user.email}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.08, rotateX: 8, rotateY: -8 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-xl font-bold"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              {darkMode ? "Light" : "Dark"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08, rotateX: 8 }}
              whileTap={{ scale: 0.94 }}
              onClick={logoutUser}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-xl font-bold"
            >
              <LogOut size={18} />
              Logout
            </motion.button>
          </div>
        </nav>

        <motion.main
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`rounded-[2rem] border backdrop-blur-2xl p-5 md:p-8 ${shellClass}`}
        >
          <Dashboard products={products} darkMode={darkMode} />

          <motion.section
            whileHover={{ y: -4 }}
            className={`mb-8 rounded-[2rem] border backdrop-blur-2xl p-6 ${panelClass}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                <PackagePlus />
              </div>
              <div>
                <p className="text-sm opacity-70 font-semibold">Product Master</p>
                <h2 className="text-2xl font-black">Add Inventory Product</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {["name", "price", "stock", "productCode", "mfgDate", "expiry"].map(
                (field) => (
                  <motion.input
                    whileFocus={{ scale: 1.03 }}
                    key={field}
                    type={field === "price" || field === "stock" ? "number" : "text"}
                    placeholder={fieldLabels[field]}
                    value={newProduct[field]}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        [field]: e.target.value,
                      })
                    }
                    className={`p-4 rounded-2xl border outline-none backdrop-blur-xl shadow-inner ${inputClass}`}
                  />
                )
              )}

              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 60px rgba(236,72,153,0.45)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={addProduct}
                className="rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-black shadow-xl"
              >
                Add Product
              </motion.button>
            </div>

            <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-white/10">
              <table className="w-full min-w-[850px] text-sm">
                <thead className="bg-white/10 backdrop-blur-xl">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Product Code</th>
                    <th className="p-4">MFG Date</th>
                    <th className="p-4">Expiry</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="p-8 text-center opacity-60 font-semibold">
                        No products found for this user
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={product.id}
                        className="border-t border-white/10 text-center hover:bg-white/10 transition"
                      >
                        <td className="p-4 font-bold">{product.name}</td>
                        <td className="p-4">₹{product.price}</td>
                        <td className="p-4">{product.stock}</td>
                        <td className="p-4">{product.product_code}</td>
                        <td className="p-4">{product.mfg_date}</td>
                        <td className="p-4">{product.expiry}</td>

                        <td className="p-4">
                          {Number(product.stock) <= 10 ? (
                            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 font-bold">
                              Low Stock
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 font-bold">
                              Available
                            </span>
                          )}
                        </td>

                        <td className="p-4">
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => deleteProduct(product.id)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold shadow-lg"
                          >
                            Delete
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.section>

          <motion.section
            whileHover={{ y: -4 }}
            className={`mb-8 rounded-[2rem] border backdrop-blur-2xl p-6 ${panelClass}`}
          >
            <BillingForm
              billNo={billNo}
              setBillNo={setBillNo}
              customer={customer}
              setCustomer={setCustomer}
              gstRate={gstRate}
              setGstRate={setGstRate}
              darkMode={darkMode}
            />
          </motion.section>

          <motion.section
            whileHover={{ y: -4 }}
            className={`mb-8 rounded-[2rem] border backdrop-blur-2xl p-6 ${panelClass}`}
          >
            <ItemForm
              products={products}
              name={name}
              setName={setName}
              price={price}
              setPrice={setPrice}
              qty={qty}
              setQty={setQty}
              discount={discount}
              setDiscount={setDiscount}
              productCode={productCode}
              setProductCode={setProductCode}
              mfgDate={mfgDate}
              setMfgDate={setMfgDate}
              expiry={expiry}
              setExpiry={setExpiry}
              addItem={addItem}
              darkMode={darkMode}
            />
          </motion.section>

          <div className="flex justify-center mb-10">
            <Buttons generatePDF={generatePDF} />
          </div>

          <motion.section
            whileHover={{ y: -4 }}
            className={`mb-8 overflow-x-auto rounded-[2rem] border backdrop-blur-2xl ${panelClass}`}
          >
            <ItemTable items={items} removeItem={removeItem} />
          </motion.section>

          <Summary
            subtotal={subtotal}
            totalDiscount={totalDiscount}
            taxable={taxable}
            cgst={cgst}
            sgst={sgst}
            total={total}
            gstRate={gstRate}
            darkMode={darkMode}
          />
        </motion.main>
      </motion.div>
    </div>
  );
}

export default App;