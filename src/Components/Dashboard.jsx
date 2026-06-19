import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";
import {
  Boxes,
  Warehouse,
  AlertTriangle,
  IndianRupee,
  Activity,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard({ products, darkMode }) {
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (acc, product) => acc + Number(product.stock),
    0
  );

  const lowStockProducts = products.filter(
    (product) => Number(product.stock) <= 10
  ).length;

  const inventoryValue = products.reduce(
    (acc, product) => acc + Number(product.price) * Number(product.stock),
    0
  );

  const availableProducts = totalProducts - lowStockProducts;

  const textColor = darkMode ? "#ffffff" : "#0f172a";
  const gridColor = darkMode
    ? "rgba(255,255,255,0.12)"
    : "rgba(15,23,42,0.12)";

  const glassCard = darkMode
    ? "bg-white/10 border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
    : "bg-white/65 border-white/80 shadow-[0_30px_90px_rgba(251,146,60,0.25)]";

  const barData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "Stock Quantity",
        data: products.map((product) => Number(product.stock)),
        backgroundColor: [
          "rgba(168,85,247,0.9)",
          "rgba(6,182,212,0.9)",
          "rgba(34,197,94,0.9)",
          "rgba(249,115,22,0.9)",
          "rgba(236,72,153,0.9)",
          "rgba(234,179,8,0.9)",
          "rgba(239,68,68,0.9)",
          "rgba(20,184,166,0.9)",
        ],
        borderColor: [
          "#c084fc",
          "#67e8f9",
          "#86efac",
          "#fdba74",
          "#f9a8d4",
          "#fde047",
          "#fca5a5",
          "#5eead4",
        ],
        borderWidth: 2,
        borderRadius: 14,
      },
    ],
  };

  const doughnutData = {
    labels: ["Available", "Low Stock"],
    datasets: [
      {
        data: [availableProducts, lowStockProducts],
        backgroundColor: [
          "rgba(34,197,94,0.95)",
          "rgba(239,68,68,0.95)",
        ],
        borderColor: darkMode ? "#020617" : "#ffffff",
        borderWidth: 6,
        hoverOffset: 14,
      },
    ],
  };

  const commonTooltip = {
    backgroundColor: darkMode
      ? "rgba(2,6,23,0.95)"
      : "rgba(255,255,255,0.95)",
    titleColor: textColor,
    bodyColor: textColor,
    borderColor: darkMode
      ? "rgba(255,255,255,0.2)"
      : "rgba(15,23,42,0.15)",
    borderWidth: 1,
    padding: 12,
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: textColor,
          font: {
            size: 13,
            weight: "bold",
          },
        },
      },
      tooltip: commonTooltip,
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          font: {
            weight: "bold",
          },
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        ticks: {
          color: textColor,
          font: {
            weight: "bold",
          },
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    cutout: "68%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: textColor,
          font: {
            size: 13,
            weight: "bold",
          },
          padding: 18,
        },
      },
      tooltip: commonTooltip,
    },
  };

  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: <Boxes />,
      glow: "from-purple-500 to-pink-500",
      blob: "bg-purple-500/40",
    },
    {
      title: "Total Stock",
      value: totalStock,
      icon: <Warehouse />,
      glow: "from-blue-500 to-cyan-400",
      blob: "bg-cyan-500/40",
    },
    {
      title: "Low Stock Items",
      value: lowStockProducts,
      icon: <AlertTriangle />,
      glow: "from-red-500 to-orange-400",
      blob: "bg-red-500/40",
    },
    {
      title: "Inventory Value",
      value: `₹${inventoryValue.toFixed(2)}`,
      icon: <IndianRupee />,
      glow: "from-emerald-500 to-lime-400",
      blob: "bg-lime-500/40",
    },
  ];

  return (
    <section className="relative mb-12">
      <div className="absolute -top-16 -left-16 w-52 h-52 bg-purple-500/25 rounded-full blur-3xl" />
      <div className="absolute top-32 -right-10 w-52 h-52 bg-cyan-500/25 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="uppercase tracking-[0.35em] text-xs font-black opacity-60">
              Analytics Overview
            </p>

            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-300 via-lime-300 to-yellow-300 bg-clip-text text-transparent">
               Inventory Dashboard
            </h2>
          </div>

          <motion.div
            whileHover={{ scale: 1.06, rotateX: 8, rotateY: -8 }}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-xl"
          >
            <Activity size={18} />
            <span className="text-sm font-black">Live Stock Insights</span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-4 gap-5 mb-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                y: -10,
                rotateX: 8,
                rotateY: index % 2 === 0 ? 6 : -6,
                scale: 1.03,
              }}
              className={`relative overflow-hidden rounded-[2rem] border backdrop-blur-2xl p-6 ${glassCard}`}
            >
              <div
                className={`absolute -top-10 -right-10 w-36 h-36 ${card.blob} rounded-full blur-3xl`}
              />

              <div className="relative">
                <div
                  className={`w-14 h-14 mb-5 rounded-2xl bg-gradient-to-br ${card.glow} flex items-center justify-center text-white shadow-[0_18px_45px_rgba(0,0,0,0.25)]`}
                >
                  {card.icon}
                </div>

                <p className="text-sm opacity-75 font-semibold">
                  {card.title}
                </p>

                <h3 className="text-3xl font-black mt-1">
                  {card.value}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -8, rotateX: 4, rotateY: 3 }}
            transition={{ duration: 0.5 }}
            className={`relative overflow-hidden rounded-[2rem] border backdrop-blur-2xl p-6 ${glassCard}`}
          >
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl" />

            <div className="relative">
              <h3 className="text-xl font-black">Stock by Product</h3>
              <p className="text-sm opacity-65 mb-6">
                Product-wise available inventory quantity
              </p>

              <Bar data={barData} options={barOptions} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -8, rotateX: 4, rotateY: -3 }}
            transition={{ duration: 0.5 }}
            className={`relative overflow-hidden rounded-[2rem] border backdrop-blur-2xl p-6 ${glassCard}`}
          >
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-lime-500/20 rounded-full blur-3xl" />

            <div className="relative">
              <h3 className="text-xl font-black">Stock Status</h3>
              <p className="text-sm opacity-65 mb-6">
                Available products versus low-stock products
              </p>

              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;