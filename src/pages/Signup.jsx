import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === email);

    if (exists) {
      alert("Email already registered");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert(`Account created for ${name}`);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gray-50 dark:bg-[#0b1220] transition-colors">

      <div className="w-[400px] rounded-2xl p-8
                      bg-white dark:bg-[#111827]
                      border border-slate-200 dark:border-white/10
                      shadow-xl">

        <h2 className="text-2xl font-semibold text-center
                       text-slate-900 dark:text-white">
          Create Account
        </h2>

        <p className="text-sm text-center mt-2
                      text-slate-500 dark:text-gray-400">
          Start tracking your expenses today
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2.5 rounded-lg
                       bg-gray-50 dark:bg-[#0b1220]
                       border border-slate-200 dark:border-white/10
                       text-slate-900 dark:text-white
                       focus:ring-2 focus:ring-blue-600 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2.5 rounded-lg
                       bg-gray-50 dark:bg-[#0b1220]
                       border border-slate-200 dark:border-white/10
                       text-slate-900 dark:text-white
                       focus:ring-2 focus:ring-blue-600 transition"
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
                       focus:ring-2 focus:ring-blue-600 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2.5 rounded-lg
                       bg-gray-50 dark:bg-[#0b1220]
                       border border-slate-200 dark:border-white/10
                       text-slate-900 dark:text-white
                       focus:ring-2 focus:ring-blue-600 transition"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            className="w-full py-2.5 rounded-lg font-medium
                       bg-blue-600 hover:bg-blue-700
                       text-white transition shadow-md"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-6
                      text-slate-500 dark:text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
