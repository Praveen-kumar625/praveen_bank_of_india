import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceChart = ({ portfolioData }) => {
  const [chartType, setChartType] = useState('performance');
  const [timeRange, setTimeRange] = useState('1Y');

  const performanceData = [
    { month: 'Jan', portfolio: 850000, benchmark: 820000 },
    { month: 'Feb', portfolio: 875000, benchmark: 835000 },
    { month: 'Mar', portfolio: 920000, benchmark: 860000 },
    { month: 'Apr', portfolio: 890000, benchmark: 845000 },
    { month: 'May', portfolio: 945000, benchmark: 880000 },
    { month: 'Jun', portfolio: 980000, benchmark: 910000 },
    { month: 'Jul', portfolio: 1020000, benchmark: 940000 },
    { month: 'Aug', portfolio: 995000, benchmark: 925000 },
    { month: 'Sep', portfolio: 1050000, benchmark: 970000 },
    { month: 'Oct', portfolio: 1085000, benchmark: 995000 },
    { month: 'Nov', portfolio: 1120000, benchmark: 1020000 },
    { month: 'Dec', portfolio: 1150000, benchmark: 1045000 }
  ];

  const allocationData = [
    { name: 'Mutual Funds', value: 45, amount: 517500, color: '#1E3A8A' },
    { name: 'Fixed Deposits', value: 25, amount: 287500, color: '#059669' },
    { name: 'Stocks', value: 20, amount: 230000, color: '#DC2626' },
    { name: 'Recurring Deposits', value: 10, amount: 115000, color: '#F59E0B' }
  ];

  const timeRanges = [
    { value: '1M', label: '1M' },
    { value: '3M', label: '3M' },
    { value: '6M', label: '6M' },
    { value: '1Y', label: '1Y' },
    { value: '3Y', label: '3Y' },
    { value: 'ALL', label: 'All' }
  ];

  const chartTypes = [
    { value: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { value: 'allocation', label: 'Allocation', icon: 'PieChart' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: ₹{entry?.value?.toLocaleString('en-IN')}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            ₹{data?.amount?.toLocaleString('en-IN')} ({data?.value}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderPerformanceChart = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="month" 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
          />
          <YAxis 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
            tickFormatter={(value) => `₹${(value / 100000)?.toFixed(0)}L`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="portfolio" 
            stroke="var(--color-primary)" 
            strokeWidth={3}
            name="Your Portfolio"
            dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="benchmark" 
            stroke="var(--color-secondary)" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Market Benchmark"
            dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderAllocationChart = () => (
    <div className="h-80 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={allocationData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {allocationData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry?.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Portfolio Analytics</h2>
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
        </div>
      </div>
      {/* Chart Type Selection */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          {chartTypes?.map((type) => (
            <button
              key={type?.value}
              onClick={() => setChartType(type?.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                chartType === type?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={type?.icon} size={16} />
              <span>{type?.label}</span>
            </button>
          ))}
        </div>

        {chartType === 'performance' && (
          <div className="flex space-x-1">
            {timeRanges?.map((range) => (
              <button
                key={range?.value}
                onClick={() => setTimeRange(range?.value)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                  timeRange === range?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {range?.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Chart Content */}
      {chartType === 'performance' ? renderPerformanceChart() : renderAllocationChart()}
      {/* Chart Legend/Summary */}
      {chartType === 'allocation' && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {allocationData?.map((item) => (
            <div key={item?.name} className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item?.color }}
              />
              <div>
                <div className="text-sm font-medium text-foreground">{item?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {item?.value}% • ₹{item?.amount?.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {chartType === 'performance' && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="text-muted-foreground">Portfolio Return</div>
            <div className="text-lg font-semibold text-success">+15.2%</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="text-muted-foreground">Benchmark Return</div>
            <div className="text-lg font-semibold text-secondary">+12.8%</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="text-muted-foreground">Alpha</div>
            <div className="text-lg font-semibold text-primary">+2.4%</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceChart;