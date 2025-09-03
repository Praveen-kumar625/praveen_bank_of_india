import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AccountSelector = ({ selectedAccount, onAccountChange, accounts }) => {
  const accountOptions = accounts?.map(account => ({
    value: account?.id,
    label: `${account?.type} - ${account?.number}`,
    description: `Balance: ₹${account?.balance?.toLocaleString('en-IN')}`
  }));

  const selectedAccountDetails = accounts?.find(acc => acc?.id === selectedAccount);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">From Account</h3>
      <Select
        label="Select Source Account"
        options={accountOptions}
        value={selectedAccount}
        onChange={onAccountChange}
        placeholder="Choose account to transfer from"
        required
      />
      {selectedAccountDetails && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Account Details</span>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={14} className="text-success" />
              <span className="text-xs text-success">Verified</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Account Type:</span>
              <span className="ml-2 font-medium text-foreground">{selectedAccountDetails?.type}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Available Balance:</span>
              <span className="ml-2 font-medium text-foreground">₹{selectedAccountDetails?.balance?.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Account Number:</span>
              <span className="ml-2 font-data text-foreground">{selectedAccountDetails?.number}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Daily Limit:</span>
              <span className="ml-2 font-medium text-foreground">₹{selectedAccountDetails?.dailyLimit?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSelector;