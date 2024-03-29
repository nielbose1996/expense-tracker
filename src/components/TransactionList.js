import React, { useState } from 'react';
import TransactionItem from './TransactionItem';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './TransactionList.css';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  const itemsPerPage = 3; 
  const [currentPage, setCurrentPage] = useState(1);

  // Get current transactions
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="transaction-list-container">
      <h2 className="transaction-header">Recent Transactions</h2>
      <div className="transaction-list">
        {currentTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onEdit={() => onEdit(transaction)}
            onDelete={() => onDelete(transaction.id)}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <FiChevronLeft />
        </button>
        <span className="page-number">{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(transactions.length / itemsPerPage)}
          className="pagination-button"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}