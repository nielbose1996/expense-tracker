import React from 'react';
import TransactionItem from './TransactionItem';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  return (
    <div className="transaction-list">
      {transactions.map(transaction => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
