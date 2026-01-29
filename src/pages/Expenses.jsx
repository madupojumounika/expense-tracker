import { useContext, useState, useMemo } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Expenses() {
  const {
    expenses,
    setExpenses,
    dashboardExpenses,
    setDashboardExpenses,
  } = useContext(ExpenseContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [activeView, setActiveView] = useState("expenses");

  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const categories = ["Food", "Transport", "Entertainment", "Bills", "Other"];

  const isFormValid = title && amount && category;

  const handleAddExpense = () => {
    if (!user) {
      setMessage("Please login to add expenses");
      setTimeout(() => setMessage(""), 2500);
      return;
    }

    if (!isFormValid) return;

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        title,
        amount: Number(amount),
        category,
        createdAt: new Date().toISOString(),
      },
    ]);

    setTitle("");
    setAmount("");
    setCategory("");
  };

  const handleAddToDashboard = (expense) => {
    const exists = dashboardExpenses.find((e) => e.id === expense.id);
    if (exists) return;

    const confirmMove = window.confirm(
      "Add this expense to dashboard? It will remain in expenses list."
    );
    if (!confirmMove) return;

    setDashboardExpenses([...dashboardExpenses, expense]);
  };

  const formatDateTime = (iso) =>
    new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  /* ---------------- FILTER + PAGINATION ---------------- */

  const filteredExpenses = useMemo(() => {
    const data =
      activeCategory === "All"
        ? expenses
        : expenses.filter((e) => e.category === activeCategory);

    return data.slice(0, visibleCount);
  }, [expenses, activeCategory, visibleCount]);

  const totalFilteredCount =
    activeCategory === "All"
      ? expenses.length
      : expenses.filter((e) => e.category === activeCategory).length;

  const hasMore = totalFilteredCount > visibleCount;

  /* ---------------- DASHBOARD DATA ---------------- */

  const categoryData = useMemo(() => {
    const data = {};
    dashboardExpenses.forEach((e) => {
      data[e.category] = (data[e.category] || 0) + e.amount;
    });
    return data;
  }, [dashboardExpenses]);

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#6366F1",
          "#F59E0B",
          "#EF4444",
        ],
        borderWidth: 0,
      },
    ],
  };

  const dailyData = useMemo(() => {
    const data = {};
    dashboardExpenses.forEach((e) => {
      const date = new Date(e.createdAt).toLocaleDateString("en-IN");
      data[date] = (data[date] || 0) + e.amount;
    });
    return data;
  }, [dashboardExpenses]);

  const barData = {
    labels: Object.keys(dailyData),
    datasets: [
      {
        label: "Daily Expenses (₹)",
        data: Object.values(dailyData),
        backgroundColor: "#3B82F6",
        borderRadius: 6,
        barThickness: 14,
      },
    ],
  };

  /* ---------------- BUTTON COLORS ---------------- */
  const btnBaseLight = "bg-slate-200 text-slate-800 hover:bg-slate-300";
  const btnBaseDark = "bg-[#0b1220] border border-white/10 text-white hover:bg-white/5";
  const categoryBtnBaseLight = "bg-slate-200 text-slate-800 hover:bg-slate-300";
  const categoryBtnBaseDark = "bg-[#0b1220] border border-white/10 text-white hover:bg-white/5";
  const disabledBtn = "bg-gray-400 text-gray-200 cursor-not-allowed pointer-events-none";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Expenses
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track, organize and analyze your spending
          </p>
        </div>

        {/* ADD EXPENSE */}
        <div className="bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-white/10 rounded-2xl p-6">
          <h3 className="font-medium mb-4 text-slate-900 dark:text-white">
            Add New Expense
          </h3>

          <div className="flex flex-wrap gap-4">
            <input
              placeholder="Expense title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-60 px-4 py-2.5 rounded-xl border bg-white dark:bg-[#0b1220] focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white"
            />

            <input
              type="number"
              placeholder="Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-36 px-4 py-2.5 rounded-xl border bg-white dark:bg-[#0b1220] focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-44 px-4 py-2.5 rounded-xl border bg-white dark:bg-[#0b1220] focus:ring-2 focus:ring-blue-500 outline-none text-slate-600 dark:text-slate-300"
            >
              <option value="" hidden>Select Category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <button
              onClick={handleAddExpense}
              disabled={!isFormValid}
              className={`px-6 py-2.5 rounded-xl font-medium transition ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : disabledBtn
              }`}
            >
              Add Expense
            </button>
          </div>

          {message && <p className="text-red-500 mt-3">{message}</p>}
        </div>

        {/* VIEW TOGGLE */}
        <div className="mt-10 flex gap-4">
          {["expenses", "dashboard"].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-5 py-2.5 rounded-xl border font-medium transition cursor-pointer ${
                activeView === view
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-[#0b1220] dark:border-white/10 dark:text-white dark:hover:bg-white/5"
              }`}
            >
              {view === "expenses" ? "All Expenses" : "Dashboard"}
            </button>
          ))}
        </div>

        {/* EXPENSES */}
        {activeView === "expenses" && (
          <>
            {/* CATEGORY FILTER */}
            <div className="mt-6 flex gap-3 flex-wrap">
              {["All", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(10);
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-[#0b1220] dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* LIST */}
            <div className="mt-6 space-y-4">
              {filteredExpenses.map((exp) => {
                const isAdded = dashboardExpenses.some((e) => e.id === exp.id);

                return (
                  <div
                    key={exp.id}
                    className="flex justify-between bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 hover:shadow-md transition cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {exp.title}
                      </p>
                      <p className="text-sm text-slate-500">
                        ₹ {exp.amount} · {exp.category}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatDateTime(exp.createdAt)}
                      </p>
                    </div>

                    {isAdded ? (
                      <span className="text-green-600 font-medium text-sm">
                        Expense added to dashboard
                      </span>
                    ) : (
                      <span
                        onClick={() => handleAddToDashboard(exp)}
                        className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition text-sm font-medium"
                      >
                        Add to Dashboard
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* VIEW MORE / VIEW LESS */}
            {totalFilteredCount > 10 && (
              <div className="mt-6 flex justify-center gap-4">
                {visibleCount < totalFilteredCount && (
                  <button
                    onClick={() => setVisibleCount((p) => p + 10)}
                    className="px-6 py-2 rounded-xl bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-[#0b1220] dark:text-white dark:hover:bg-white/5 transition cursor-pointer font-medium"
                  >
                    View More
                  </button>
                )}

                {visibleCount > 10 && (
                  <button
                    onClick={() => setVisibleCount(10)}
                    className="px-6 py-2 rounded-xl bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-[#0b1220] dark:text-white dark:hover:bg-white/5 transition cursor-pointer font-medium"
                  >
                    View Less
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* DASHBOARD */}
        {activeView === "dashboard" && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-[#0b1220] p-6 rounded-2xl border">
              <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">
                Expenses by Category
              </h3>
              <div className="h-[240px]">
                <Pie data={pieData} />
              </div>
            </div>

            <div className="bg-white dark:bg-[#0b1220] p-6 rounded-2xl border">
              <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">
                Daily Expenses
              </h3>
              <div className="h-[240px]">
                <Bar
                  data={barData}
                  options={{
                    plugins: { legend: { display: false } },
                    scales: {
                      y: {
                        grid: { color: "rgba(148,163,184,0.3)" },
                        ticks: { color: "#94a3b8" },
                      },
                      x: {
                        grid: { display: false },
                        ticks: { color: "#94a3b8" },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
