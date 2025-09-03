import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AmountInput = ({ amount, onAmountChange, transferType, selectedAccount, accounts }) => {
  const [purpose, setPurpose] = useState('');
  const [reference, setReference] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');

  const purposeOptions = [
    { value: 'family-maintenance', label: 'Family Maintenance' },
    { value: 'education', label: 'Education' },
    { value: 'medical', label: 'Medical Expenses' },
    { value: 'business', label: 'Business Payment' },
    { value: 'loan-repayment', label: 'Loan Repayment' },
    { value: 'investment', label: 'Investment' },
    { value: 'gift', label: 'Gift' },
    { value: 'others', label: 'Others' }
  ];

  const selectedAccountDetails = accounts?.find(acc => acc?.id === selectedAccount);
  const availableBalance = selectedAccountDetails?.balance || 0;
  const dailyLimit = selectedAccountDetails?.dailyLimit || 0;

  const getTransferCharges = () => {
    if (transferType === 'upi-payment') return 0;
    if (transferType === 'own-account') return 0;
    if (amount <= 10000) return 2.5;
    if (amount <= 100000) return 5;
    return 15;
  };

  const getProcessingTime = () => {
    switch (transferType) {
      case 'upi-payment': return 'Instant';
      case 'own-account': return 'Instant';
      default: return amount > 200000 ? '2-4 hours (RTGS)' : '30 minutes (IMPS)';
    }
  };

  const charges = getTransferCharges();
  const totalAmount = parseFloat(amount || 0) + charges;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Transfer Details</h3>
      <div className="space-y-4">
        <div className="relative">
          <Input
            label="Transfer Amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => onAmountChange(e?.target?.value)}
            required
            min="1"
            max={Math.min(availableBalance, dailyLimit)}
          />
          <div className="absolute left-3 top-9 text-muted-foreground">₹</div>
        </div>

        {amount && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted rounded-lg text-sm">
            <div>
              <span className="text-muted-foreground">Available Balance:</span>
              <p className="font-medium text-foreground">₹{availableBalance?.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Transfer Charges:</span>
              <p className="font-medium text-foreground">₹{charges?.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Debit:</span>
              <p className="font-medium text-primary">₹{totalAmount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        )}

        <Select
          label="Purpose of Transfer"
          options={purposeOptions}
          value={purpose}
          onChange={setPurpose}
          placeholder="Select transfer purpose"
          required
        />

        <Input
          label="Reference/Remarks"
          type="text"
          placeholder="Enter reference or remarks (optional)"
          value={reference}
          onChange={(e) => setReference(e?.target?.value)}
          maxLength={50}
        />

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              label="Schedule Transfer (Optional)"
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e?.target?.value)}
              min={new Date()?.toISOString()?.split('T')?.[0]}
            />
          </div>
          <div className="flex items-center space-x-2 mt-6">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Processing: {getProcessingTime()}</span>
          </div>
        </div>

        {amount > availableBalance && (
          <div className="p-3 bg-error/10 rounded-lg border border-error/20">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm font-medium text-error">Insufficient Balance</span>
            </div>
            <p className="text-sm text-error mt-1">
              Transfer amount exceeds available balance by ₹{(totalAmount - availableBalance)?.toLocaleString('en-IN')}
            </p>
          </div>
        )}

        {amount > dailyLimit && (
          <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Daily Limit Exceeded</span>
            </div>
            <p className="text-sm text-warning mt-1">
              Transfer amount exceeds daily limit. Maximum allowed: ₹{dailyLimit?.toLocaleString('en-IN')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AmountInput;