import React, { useState } from 'react';
import Modal from 'react-modal';
import './AddExpenseModal.css';

 

function AddExpenseModal({ isModalOpen, onAddExpense, onRequestClose }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !category || !date) {
      alert('Please fill in all fields.');
      return;
    }
    onAddExpense({ title, amount: parseFloat(price), category, date });
    onRequestClose(); // Close modal
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Expense Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <div>
        <h2>Add Expenses</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
            {/* Add other categories as needed */}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="modal-actions">
            <button type="submit" className="button add-btn">Add Expense</button>
            <button type="button" onClick={onRequestClose} className="button cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default AddExpenseModal;
