import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const FinancialInsightsWidget = () => {
  const monthlySpending = [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 52000 },
    { month: 'Mar', amount: 48000 },
    { month: 'Apr', amount: 61000 },
    { month: 'May', amount: 55000 },
    { month: 'Jun', amount: 58000 }
  ];

  const spendingCategories = [
    { name: 'Utilities', value: 15000, color: '#1E3A8A' },
    { name: 'Groceries', value: 12000, color: '#059669' },
    { name: 'Entertainment', value: 8000, color: '#F59E0B' },
    { name: 'Transport', value: 6000, color: '#DC2626' },
    { name: 'Others', value: 17000, color: '#64748B' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const totalSpending = spendingCategories?.reduce((sum, category) => sum + category?.value, 0);

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Financial Insights</h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={14} />
            <span>Last 6 months</span>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Monthly Spending Trend */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Monthly Spending Trend</h3>
          <div className="w-full h-48" aria-label="Monthly Spending Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  tickFormatter={(value) => `₹${value/1000}K`}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Amount']}
                  labelStyle={{ color: 'var(--color-foreground)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="var(--color-primary)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending Categories */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Spending by Category</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {spendingCategories?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Amount']}
                    contentStyle={{ 
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {spendingCategories?.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category?.color }}
                    />
                    <span className="text-sm text-foreground">{category?.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {formatCurrency(category?.value)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {((category?.value / totalSpending) * 100)?.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Lightbulb" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Smart Insights</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Your spending increased by 12% compared to last month</li>
                <li>• Utilities account for the highest expense category</li>
                <li>• Consider setting up auto-pay for recurring bills</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialInsightsWidget;