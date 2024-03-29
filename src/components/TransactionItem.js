import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './TransactionItem.css';

export default function TransactionItem({ transaction, onEdit, onDelete }) {
  return (
    <div className="transaction-item">
      <span className="transaction-title">{transaction.title}</span>
      <span className="transaction-date">{transaction.date}</span>
      <span className="transaction-amount">₹{transaction.amount}</span>
      <button onClick={() => onEdit(transaction)} className="edit-button">
        <FiEdit2 className="icon" />
      </button>
      <button onClick={() => onDelete(transaction.id)} className="delete-button">
        <FiTrash2 className="icon" />
      </button>
    </div>
  );
}
