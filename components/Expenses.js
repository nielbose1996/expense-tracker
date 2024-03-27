import React from 'react';

export default function Expenses({ totalExpenses }) {
  return (
    <div className="expenses">
      <h2>Expenses: ₹{totalExpenses}</h2>
      <button>+ Add Expense</button>
    </div>
  );
}
