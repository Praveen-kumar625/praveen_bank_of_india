import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TransactionFilters = ({ filters, onFiltersChange, onReset }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const transactionTypes = [
    { value: 'all', label: 'All Transactions' },
    { value: 'credit', label: 'Credit' },
    { value: 'debit', label: 'Debit' },
    { value: 'transfer', label: 'Fund Transfer' },
    { value: 'payment', label: 'Bill Payment' },
    { value: 'investment', label: 'Investment' },
    { value: 'loan', label: 'Loan' },
    { value: 'interest', label: 'Interest' },
    { value: 'charges', label: 'Charges' }
  ];

  const accountOptions = [
    { value: 'all', label: 'All Accounts' },
    { value: '1234567890', label: 'Savings Account - ****7890' },
    { value: '0987654321', label: 'Current Account - ****4321' },
    { value: '1122334455', label: 'Fixed Deposit - ****4455' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Filter Transactions
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less Filters' : 'More Filters'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div className="space-y-2">
          <Input
            label="From Date"
            type="date"
            value={filters?.fromDate}
            onChange={(e) => handleFilterChange('fromDate', e?.target?.value)}
          />
        </div>
        <div className="space-y-2">
          <Input
            label="To Date"
            type="date"
            value={filters?.toDate}
            onChange={(e) => handleFilterChange('toDate', e?.target?.value)}
          />
        </div>

        {/* Transaction Type */}
        <div className="space-y-2">
          <Select
            label="Transaction Type"
            options={transactionTypes}
            value={filters?.type}
            onChange={(value) => handleFilterChange('type', value)}
          />
        </div>

        {/* Account */}
        <div className="space-y-2">
          <Select
            label="Account"
            options={accountOptions}
            value={filters?.account}
            onChange={(value) => handleFilterChange('account', value)}
          />
        </div>
      </div>
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
          {/* Amount Range */}
          <div className="space-y-2">
            <Input
              label="Min Amount (₹)"
              type="number"
              placeholder="0"
              value={filters?.minAmount}
              onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Max Amount (₹)"
              type="number"
              placeholder="No limit"
              value={filters?.maxAmount}
              onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
            />
          </div>

          {/* Search */}
          <div className="space-y-2 md:col-span-2">
            <Input
              label="Search Description/Reference"
              type="search"
              placeholder="Search transactions..."
              value={filters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;