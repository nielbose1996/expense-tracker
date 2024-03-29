import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,  Tooltip, Legend } from 'recharts';
import './Chart.css';

const COLORS = ['#FFBB28', '#FF8042', '#0088FE'];




function ExpenseSummary({ data }) {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx={150}
        cy={150}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
        labelLine={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
    </PieChart>
  );
}


function ExpenseTrends({ data }) {
  return (
    <div className="expense-summary-container">
    <h2 className="expense-summary-header">Top Expenses</h2>
    <BarChart
      width={500}
      height={300}
      data={data}
      layout="vertical" // This will make the bar chart horizontal
      margin={{
        top: 20, right: 100, left: 100, bottom: 5,
      }}
    >
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Bar dataKey="amount" fill="#8884d8" barSize={20} />
    </BarChart>
    </div>
  );
}


  
  export { ExpenseSummary, ExpenseTrends };
  