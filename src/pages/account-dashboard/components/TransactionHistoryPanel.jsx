import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionHistoryPanel = ({ transactions, onViewAll }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(transactions?.length / itemsPerPage);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    })?.format(Math.abs(amount));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'credit':
        return 'ArrowDownLeft';
      case 'debit':
        return 'ArrowUpRight';
      case 'transfer':
        return 'ArrowLeftRight';
      default:
        return 'ArrowLeftRight';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'credit':
        return 'text-success';
      case 'debit':
        return 'text-error';
      case 'transfer':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const paginatedTransactions = transactions?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewAll}
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={14}
          >
            View All
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date & Time</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Description</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Amount</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Balance</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions?.map((transaction, index) => (
              <tr key={transaction?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-1.5 rounded-full bg-muted ${getTransactionColor(transaction?.type)}`}>
                      <Icon name={getTransactionIcon(transaction?.type)} size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{formatDate(transaction?.date)}</p>
                      <p className="text-xs text-muted-foreground">{formatTime(transaction?.date)}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm font-medium text-foreground">{transaction?.description}</p>
                  {transaction?.reference && (
                    <p className="text-xs text-muted-foreground font-data">Ref: {transaction?.reference}</p>
                  )}
                </td>
                <td className="p-4 text-right">
                  <span className={`text-sm font-semibold ${
                    transaction?.amount > 0 ? 'text-success' : 'text-error'
                  }`}>
                    {transaction?.amount > 0 ? '+' : '-'}{formatCurrency(transaction?.amount)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className="text-sm font-medium text-foreground">
                    {formatCurrency(transaction?.balance)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, transactions?.length)} of {transactions?.length} transactions
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
                iconSize={16}
              />
              <span className="text-sm text-foreground px-3 py-1">
                {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconSize={16}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistoryPanel;