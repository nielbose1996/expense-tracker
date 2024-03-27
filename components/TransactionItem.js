import React from 'react';
import './TransactionItem.css';

export default function TransactionItem({ transaction, onEdit, onDelete }) {
  return (
    <div className="transaction-item">
      <span className="title">{transaction.title}</span>
      <span className="date">{transaction.date}</span>
      <span className="amount">₹{transaction.amount}</span>
      <button onClick={() => onEdit(transaction.id)}>✏️</button>
      <button onClick={() => onDelete(transaction.id)}>❌</button>
    </div>
  );
}
