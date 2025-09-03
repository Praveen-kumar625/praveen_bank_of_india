import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TransferConfirmation = ({ transferDetails, onNewTransfer, onViewHistory }) => {
  const currentDate = new Date()?.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Success Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Transfer Successful!</h3>
        <p className="text-muted-foreground">Your money transfer has been processed successfully</p>
      </div>
      {/* Transaction Details */}
      <div className="space-y-6">
        <div className="p-4 bg-success/5 rounded-lg border border-success/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">Transaction Details</h4>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm text-success font-medium">Verified</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Transaction ID:</span>
              <p className="font-data font-medium text-foreground">TXN{Date.now()?.toString()?.slice(-8)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Date & Time:</span>
              <p className="font-medium text-foreground">{currentDate}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Transfer Amount:</span>
              <p className="font-medium text-foreground">₹{transferDetails?.amount}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Transfer Charges:</span>
              <p className="font-medium text-foreground">₹{transferDetails?.charges}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Debited:</span>
              <p className="font-semibold text-primary">₹{transferDetails?.total}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <div className="flex items-center space-x-1">
                <Icon name="CheckCircle" size={14} className="text-success" />
                <span className="font-medium text-success">Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h5 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="ArrowUp" size={16} className="mr-2 text-error" />
              From Account
            </h5>
            <div className="text-sm space-y-1">
              <p className="font-medium text-foreground">{transferDetails?.fromAccount?.type}</p>
              <p className="font-data text-muted-foreground">{transferDetails?.fromAccount?.number}</p>
              <p className="text-muted-foreground">Praveen Bank of India</p>
            </div>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <h5 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="ArrowDown" size={16} className="mr-2 text-success" />
              To Account
            </h5>
            <div className="text-sm space-y-1">
              <p className="font-medium text-foreground">{transferDetails?.toAccount?.name}</p>
              <p className="font-data text-muted-foreground">{transferDetails?.toAccount?.number}</p>
              <p className="text-muted-foreground">{transferDetails?.toAccount?.bank}</p>
            </div>
          </div>
        </div>

        {/* Reference Information */}
        {transferDetails?.reference && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-foreground mb-2">Reference Details</h5>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Purpose:</span> {transferDetails?.purpose}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Reference:</span> {transferDetails?.reference}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            className="flex-1"
          >
            Download Receipt
          </Button>
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
            className="flex-1"
          >
            Share Receipt
          </Button>
          <Button
            variant="outline"
            onClick={onViewHistory}
            iconName="History"
            iconPosition="left"
            className="flex-1"
          >
            View History
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onNewTransfer}
            iconName="Plus"
            iconPosition="left"
            className="flex-1"
          >
            New Transfer
          </Button>
          <Button
            variant="secondary"
            iconName="Home"
            iconPosition="left"
            className="flex-1"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
      {/* Important Information */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-600 mb-1">Important Information</p>
              <ul className="text-xs text-yellow-600 space-y-1">
                <li>• Keep the transaction ID for future reference</li>
                <li>• Money will be credited to beneficiary account within processing time</li>
                <li>• Contact customer support for any transaction disputes</li>
                <li>• SMS confirmation will be sent to your registered mobile number</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferConfirmation;