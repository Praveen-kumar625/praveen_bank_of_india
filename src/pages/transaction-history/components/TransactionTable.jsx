import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionTable = ({ transactions, onSort, sortConfig, onTransactionClick }) => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    onSort({ key, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedTransactions(transactions?.map(t => t?.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectTransaction = (transactionId, checked) => {
    if (checked) {
      setSelectedTransactions([...selectedTransactions, transactionId]);
    } else {
      setSelectedTransactions(selectedTransactions?.filter(id => id !== transactionId));
    }
  };

  const getTransactionTypeIcon = (type) => {
    const iconMap = {
      credit: 'ArrowDownLeft',
      debit: 'ArrowUpRight',
      transfer: 'ArrowLeftRight',
      payment: 'CreditCard',
      investment: 'TrendingUp',
      loan: 'Banknote',
      interest: 'Percent',
      charges: 'Receipt'
    };
    return iconMap?.[type] || 'Circle';
  };

  const getTransactionTypeColor = (type) => {
    const colorMap = {
      credit: 'text-success',
      debit: 'text-error',
      transfer: 'text-primary',
      payment: 'text-warning',
      investment: 'text-accent',
      loan: 'text-secondary',
      interest: 'text-success',
      charges: 'text-error'
    };
    return colorMap?.[type] || 'text-muted-foreground';
  };

  const formatAmount = (amount, type) => {
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    })?.format(Math.abs(amount));

    return (
      <span className={type === 'credit' ? 'text-success' : 'text-error'}>
        {type === 'credit' ? '+' : '-'}{formattedAmount}
      </span>
    );
  };

  const SortableHeader = ({ label, sortKey, className = "" }) => (
    <th 
      className={`px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/50 ${className}`}
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <Icon 
          name={
            sortConfig?.key === sortKey 
              ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown')
              : 'ChevronsUpDown'
          } 
          size={14} 
        />
      </div>
    </th>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedTransactions?.length === transactions?.length && transactions?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <SortableHeader label="Date" sortKey="date" />
              <SortableHeader label="Description" sortKey="description" />
              <SortableHeader label="Type" sortKey="type" />
              <SortableHeader label="Amount" sortKey="amount" />
              <SortableHeader label="Balance" sortKey="balance" />
              <SortableHeader label="Reference" sortKey="reference" />
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {transactions?.map((transaction) => (
              <tr 
                key={transaction?.id} 
                className="hover:bg-muted/20 cursor-pointer transition-colors"
                onClick={() => onTransactionClick(transaction)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedTransactions?.includes(transaction?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      handleSelectTransaction(transaction?.id, e?.target?.checked);
                    }}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  <div>
                    <div className="font-medium">{transaction?.date}</div>
                    <div className="text-xs text-muted-foreground">{transaction?.time}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <div className="max-w-xs">
                    <div className="font-medium truncate">{transaction?.description}</div>
                    {transaction?.beneficiary && (
                      <div className="text-xs text-muted-foreground truncate">
                        To: {transaction?.beneficiary}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getTransactionTypeIcon(transaction?.type)} 
                      size={16} 
                      className={getTransactionTypeColor(transaction?.type)}
                    />
                    <span className="capitalize text-foreground">{transaction?.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {formatAmount(transaction?.amount, transaction?.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground font-data">
                  ₹{new Intl.NumberFormat('en-IN')?.format(transaction?.balance)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground font-data">
                  {transaction?.reference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle receipt download
                      }}
                      iconName="Download"
                      iconSize={14}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle dispute
                      }}
                      iconName="AlertTriangle"
                      iconSize={14}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {transactions?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Receipt" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Transactions Found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;