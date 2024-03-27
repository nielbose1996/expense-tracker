import React from 'react';
import './ExpenseandWallet.css';

export default function WalletBalance({ balance, onAddIncome }) {
  return (
    <div className="wallet-balance">
      <h2>Wallet Balance: ₹{balance}</h2>
      <button onClick={onAddIncome}>+ Add Income</button>
    </div>
  );
}

