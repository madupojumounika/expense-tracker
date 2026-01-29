import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function Profile() {
  const { expenses } = useContext(ExpenseContext);

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="p-10 max-w-4xl">
      <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <h3 className="mt-2 text-2xl font-semibold text-gray-900">
            {expenses.length}
          </h3>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">Total Spent</p>
          <h3 className="mt-2 text-2xl font-semibold text-gray-900">
            ₹ {totalAmount}
          </h3>
        </div>
      </div>
    </div>
  );
}
