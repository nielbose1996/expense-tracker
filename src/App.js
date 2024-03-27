import React, { useState,useEffect } from 'react';
import WalletBalance from './components/WalletBalance';
import Expenses from './components/Expenses';
import TransactionList from './components/TransactionList';
import { ExpenseSummary, ExpenseTrends } from './components/Charts';
import AddExpenseModal from './components/AddExpenseModal';
import AddBalanceModal from './components/AddBalanceModal';
import EditExpenseModal from './components/EditExpenseModal';

function App() {
  const [balance, setBalance] = useState(
    JSON.parse(localStorage.getItem('balance')) || 5000
  );
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem('transactions')) || []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentExpenseToEdit, setCurrentExpenseToEdit] = useState(null);


  const deleteTransaction = (id) => {
    const filteredTransactions = transactions.filter(t => t.id !== id);
    const transactionToDelete = transactions.find(t => t.id === id);
    setTransactions(filteredTransactions);
    setBalance(balance + transactionToDelete.amount);
  };



  const handleAddExpense = (expense) => {
    if (expense.amount <= balance) {
      const newTransactions = [...transactions, { ...expense, id: Date.now() }];
      setTransactions(newTransactions);
      setBalance(balance - expense.amount);
      setIsModalOpen(false); // Close the modal after adding the expense
    } else {
      alert("You cannot spend more than the available wallet balance.");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddBalance = (amount) => {
    setBalance(balance + amount);
    setIsAddBalanceModalOpen(false); // Close the modal after adding the balance
  };

  const handleOpenAddBalanceModal = () => {
    setIsAddBalanceModalOpen(true);
  };

  const handleCloseAddBalanceModal = () => {
    setIsAddBalanceModalOpen(false);
  };

  const openEditModal = (transaction) => {
    setCurrentExpenseToEdit(transaction);
    setIsEditModalOpen(true);
  };

  // Function to handle the actual update of the transaction
  const editTransaction = (updatedTransaction) => {
    setTransactions(transactions.map((transaction) =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    ));
    setIsEditModalOpen(false);
  };

  const totalExpenses = transactions.reduce((acc, t) => acc + t.amount, 0);
  useEffect(() => {
    const totalExpenses = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const newBalance = 5000 - totalExpenses; // Assuming 5000 is the initial balance
    setBalance(newBalance);
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('balance', JSON.stringify(balance));
  }, [balance]);

  // Update localStorage when transactions change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  return (
    <div className="app">
      <WalletBalance balance={balance} onAddIncome={handleOpenAddBalanceModal} />      
      <AddBalanceModal
        isModalOpen={isAddBalanceModalOpen}
        onAddBalance={handleAddBalance}
        onRequestClose={handleCloseAddBalanceModal}
      />
      <Expenses totalExpenses={totalExpenses} onAddExpense={handleOpenModal} />
      <div className="charts">
        <ExpenseSummary data={calculateSummaryData(transactions)} />
        <ExpenseTrends data={calculateTrendsData(transactions)} />
      </div>
      <TransactionList
        transactions={transactions}
        onEdit={openEditModal}
        onDelete={deleteTransaction}
      />
      <EditExpenseModal
        isModalOpen={isEditModalOpen}
        onEditExpense={editTransaction}
        onRequestClose={() => setIsEditModalOpen(false)}
        expenseToEdit={currentExpenseToEdit}
      />
      <AddExpenseModal
        isModalOpen={isModalOpen}
        onAddExpense={handleAddExpense}
        onRequestClose={handleCloseModal}
      />
    </div>
  );

}

// Helper function to calculate summary data for the pie chart
function calculateSummaryData(transactions) {
  const summary = {};

  transactions.forEach((transaction) => {
    const { category, amount } = transaction;
    if (summary[category]) {
      summary[category] += amount;
    } else {
      summary[category] = amount;
    }
  });

  // Convert the summary object into an array of objects
  return Object.keys(summary).map((category) => ({
    name: category,
    value: summary[category],
  }));
}

// Helper function to calculate trends data for the bar chart
function calculateTrendsData(transactions) {
  const trends = {};

  transactions.forEach((transaction) => {
    const { category, amount } = transaction;
    if (trends[category]) {
      trends[category] += amount;
    } else {
      trends[category] = amount;
    }
  });

  // Convert the trends object into an array of objects
  return Object.keys(trends).map((category) => ({
    name: category,
    amount: trends[category],
  }));
}


export default App;
