import React from 'react';
import './ExpenseandWallet.css';


export default function Expenses({ totalExpenses, onAddExpense }) {
  return (
    <div className="expenses">
      <h2>Expenses: ₹{totalExpenses}</h2>
      <button onClick={onAddExpense}>+ Add Expense</button>
    </div>
  );
}
