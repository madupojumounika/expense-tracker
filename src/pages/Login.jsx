import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setExpenses, setDashboardExpenses } = useContext(ExpenseContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));

      const userExpenses =
        JSON.parse(localStorage.getItem(`expenses_${user.email}`)) || [];
      const userDashboard =
        JSON.parse(localStorage.getItem(`dashboardExpenses_${user.email}`)) ||
        [];

      setExpenses(userExpenses);
      setDashboardExpenses(userDashboard);

      console.log(`Welcome back, ${user.name}`);

      setTimeout(() =>{
        setLoading(false);
        navigate("/expenses");  
      }, 500);
      
    } else {
      alert("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gray-50 dark:bg-[#0b1220] transition-colors">

      <div className="w-[380px] rounded-2xl p-8
                      bg-white dark:bg-[#111827]
                      border border-slate-200 dark:border-white/10
                      shadow-xl">

        <h2 className="text-2xl font-semibold text-center
                       text-slate-900 dark:text-white">
          Welcome Back
        </h2>

        <p className="text-sm text-center mt-2
                      text-slate-500 dark:text-gray-400">
          Login to continue tracking expenses
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2.5 rounded-lg
                       bg-gray-50 dark:bg-[#0b1220]
                       border border-slate-200 dark:border-white/10
                       text-slate-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-600
                       transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2.5 rounded-lg
                       bg-gray-50 dark:bg-[#0b1220]
                       border border-slate-200 dark:border-white/10
                       text-slate-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-600
                       transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-medium
                       bg-blue-600 hover:bg-blue-700
                       text-white transition shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-6
                      text-slate-500 dark:text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
