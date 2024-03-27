import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './EditExpenseModal.css';

function EditExpenseModal({ isModalOpen, onEditExpense, onRequestClose, expenseToEdit }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  // When the modal is opened and an expense is passed in, populate the state
  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setPrice(expenseToEdit.amount.toString());
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !category || !date) {
      alert('All fields are required.');
      return;
    }
    onEditExpense({
      ...expenseToEdit,
      title,
      amount: parseFloat(price),
      category,
      date
    });
    onRequestClose(); // Close modal after editing
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Expense Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Edit Expenses</h2>
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
          {/* Insert other categories here */}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="modal-actions">
          <button type="submit" className="button">Add Expense</button>
          <button type="button" onClick={onRequestClose} className="button">Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

export default EditExpenseModal;
