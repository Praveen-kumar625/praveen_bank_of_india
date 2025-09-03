import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const TransactionSummary = ({ summaryData }) => {
  const monthlyData = [
    { month: 'Jan', income: 85000, expense: 45000 },
    { month: 'Feb', income: 90000, expense: 52000 },
    { month: 'Mar', income: 88000, expense: 48000 },
    { month: 'Apr', income: 92000, expense: 55000 },
    { month: 'May', income: 87000, expense: 49000 },
    { month: 'Jun', income: 95000, expense: 58000 }
  ];

  const categoryData = [
    { name: 'Food & Dining', value: 15000, color: '#059669' },
    { name: 'Shopping', value: 12000, color: '#1E3A8A' },
    { name: 'Transportation', value: 8000, color: '#F59E0B' },
    { name: 'Utilities', value: 6000, color: '#DC2626' },
    { name: 'Entertainment', value: 4000, color: '#7C3AED' },
    { name: 'Others', value: 3000, color: '#64748B' }
  ];

  const summaryCards = [
    {
      title: 'Total Income',
      value: '₹2,45,000',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'text-success'
    },
    {
      title: 'Total Expenses',
      value: '₹1,85,000',
      change: '+8.2%',
      changeType: 'negative',
      icon: 'TrendingDown',
      color: 'text-error'
    },
    {
      title: 'Net Savings',
      value: '₹60,000',
      change: '+25.3%',
      changeType: 'positive',
      icon: 'PiggyBank',
      color: 'text-accent'
    },
    {
      title: 'Transactions',
      value: '156',
      change: '+5.1%',
      changeType: 'positive',
      icon: 'Receipt',
      color: 'text-primary'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards?.map((card, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{card?.title}</p>
                <p className="text-2xl font-bold text-foreground">{card?.value}</p>
                <div className="flex items-center mt-2">
                  <Icon 
                    name={card?.changeType === 'positive' ? 'ArrowUp' : 'ArrowDown'} 
                    size={14} 
                    className={card?.changeType === 'positive' ? 'text-success' : 'text-error'}
                  />
                  <span className={`text-sm ml-1 ${card?.changeType === 'positive' ? 'text-success' : 'text-error'}`}>
                    {card?.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-muted/30`}>
                <Icon name={card?.icon} size={24} className={card?.color} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Monthly Trends</h3>
            <Icon name="BarChart3" size={20} className="text-muted-foreground" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  formatter={(value) => [`₹${new Intl.NumberFormat('en-IN')?.format(value)}`, '']}
                  labelStyle={{ color: 'var(--color-foreground)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="income" fill="var(--color-success)" name="Income" radius={[2, 2, 0, 0]} />
                <Bar dataKey="expense" fill="var(--color-error)" name="Expense" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Expense Categories</h3>
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`₹${new Intl.NumberFormat('en-IN')?.format(value)}`, '']}
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {categoryData?.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category?.color }}
                  />
                  <span className="text-sm text-foreground">{category?.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  ₹{new Intl.NumberFormat('en-IN')?.format(category?.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;