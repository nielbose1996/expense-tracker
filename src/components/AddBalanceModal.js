import React, { useState } from 'react';
import Modal from 'react-modal';
import './AddBalanceModal.css'

function AddBalanceModal({ isModalOpen, onAddBalance, onRequestClose }) {
  const [incomeAmount, setIncomeAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(incomeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    onAddBalance(amount);
    onRequestClose(); // Close modal
    setIncomeAmount(''); // Reset the income amount
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Balance Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Add Balance</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Income Amount"
          value={incomeAmount}
          onChange={(e) => setIncomeAmount(e.target.value)}
        />
        <div className="modal-actions">
          <button type="submit" className="button add-btn">Add Balance</button>
          <button type="button" onClick={onRequestClose} className="button cancel-btn">Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

export default AddBalanceModal;
