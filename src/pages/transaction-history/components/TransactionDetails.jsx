import React from 'react';

import Button from '../../../components/ui/Button';

const TransactionDetails = ({ transaction, isOpen, onClose }) => {
  if (!isOpen || !transaction) return null;

  const getStatusColor = (status) => {
    const colorMap = {
      completed: 'text-success bg-success/10',
      pending: 'text-warning bg-warning/10',
      failed: 'text-error bg-error/10',
      processing: 'text-primary bg-primary/10'
    };
    return colorMap?.[status] || 'text-muted-foreground bg-muted/10';
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

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Transaction Details</h2>
              <p className="text-sm text-muted-foreground">Reference: {transaction?.reference}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status and Amount */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction?.status)}`}>
                  {transaction?.status?.charAt(0)?.toUpperCase() + transaction?.status?.slice(1)}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {formatAmount(transaction?.amount, transaction?.type)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Balance: ₹{new Intl.NumberFormat('en-IN')?.format(transaction?.balance)}
                </div>
              </div>
            </div>

            {/* Transaction Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
                  <p className="text-foreground">{transaction?.date} at {transaction?.time}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="text-foreground">{transaction?.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Transaction Type</label>
                  <p className="text-foreground capitalize">{transaction?.type}</p>
                </div>
                {transaction?.beneficiary && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Beneficiary</label>
                    <p className="text-foreground">{transaction?.beneficiary}</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Reference Number</label>
                  <p className="text-foreground font-data">{transaction?.reference}</p>
                </div>
                {transaction?.utr && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">UTR Number</label>
                    <p className="text-foreground font-data">{transaction?.utr}</p>
                  </div>
                )}
                {transaction?.mode && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Payment Mode</label>
                    <p className="text-foreground">{transaction?.mode}</p>
                  </div>
                )}
                {transaction?.charges && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Charges</label>
                    <p className="text-foreground">₹{new Intl.NumberFormat('en-IN')?.format(transaction?.charges)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Details */}
            {transaction?.remarks && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Remarks</label>
                <p className="text-foreground bg-muted/30 p-3 rounded-lg mt-1">{transaction?.remarks}</p>
              </div>
            )}

            {/* Account Details */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">From Account:</span>
                  <p className="text-foreground font-data">{transaction?.fromAccount || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">To Account:</span>
                  <p className="text-foreground font-data">{transaction?.toAccount || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Download Receipt
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Share"
                iconPosition="left"
              >
                Share
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              {transaction?.status === 'completed' && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="AlertTriangle"
                  iconPosition="left"
                >
                  Report Issue
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                iconName="Copy"
                iconPosition="left"
              >
                Copy Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetails;