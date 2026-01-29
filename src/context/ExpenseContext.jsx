import { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  // Load current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userEmail = currentUser?.email;

  // Keys in localStorage per user
  const userExpensesKey = userEmail ? `expenses_${userEmail}` : null;
  const userDashboardKey = userEmail ? `dashboardExpenses_${userEmail}` : null;

  // State for this user's expenses
  const [expenses, setExpenses] = useState(() => {
    if (!userExpensesKey) return [];
    const stored = localStorage.getItem(userExpensesKey);
    return stored ? JSON.parse(stored) : [];
  });

  const [dashboardExpenses, setDashboardExpenses] = useState(() => {
    if (!userDashboardKey) return [];
    const stored = localStorage.getItem(userDashboardKey);
    return stored ? JSON.parse(stored) : [];
  });

  // Save to localStorage whenever expenses change
  useEffect(() => {
    if (userExpensesKey) {
      localStorage.setItem(userExpensesKey, JSON.stringify(expenses));
    }
  }, [expenses, userExpensesKey]);

  useEffect(() => {
    if (userDashboardKey) {
      localStorage.setItem(userDashboardKey, JSON.stringify(dashboardExpenses));
    }
  }, [dashboardExpenses, userDashboardKey]);

  // Function to reset context on logout
  const resetExpenses = () => {
    setExpenses([]);
    setDashboardExpenses([]);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        dashboardExpenses,
        setDashboardExpenses,
        resetExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
