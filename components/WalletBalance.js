import React from 'react';
import './ExpenseandWallet.css';

export default function WalletBalance({ balance }) {
  return (
    <div className="wallet-balance">
      <h2>Wallet Balance: ₹{balance}</h2>
      <button>+ Add Income</button>
    </div>
  );
}
