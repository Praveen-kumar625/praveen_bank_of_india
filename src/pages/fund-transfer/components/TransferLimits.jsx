import React from 'react';
import Icon from '../../../components/AppIcon';

const TransferLimits = ({ transferType, selectedAccount, accounts }) => {
  const selectedAccountDetails = accounts?.find(acc => acc?.id === selectedAccount);
  
  const getLimitsData = () => {
    const baseData = {
      dailyLimit: selectedAccountDetails?.dailyLimit || 500000,
      dailyUsed: selectedAccountDetails?.dailyUsed || 125000,
      monthlyLimit: selectedAccountDetails?.monthlyLimit || 1000000,
      monthlyUsed: selectedAccountDetails?.monthlyUsed || 450000,
      transactionLimit: 200000
    };

    switch (transferType) {
      case 'upi-payment':
        return {
          ...baseData,
          dailyLimit: 100000,
          transactionLimit: 100000,
          processingTime: 'Instant',
          charges: 'Free'
        };
      case 'own-account':
        return {
          ...baseData,
          processingTime: 'Instant',
          charges: 'Free'
        };
      default:
        return {
          ...baseData,
          processingTime: 'IMPS: 30 min | RTGS: 2-4 hrs',
          charges: '₹2.5 - ₹15'
        };
    }
  };

  const limitsData = getLimitsData();
  const dailyRemaining = limitsData?.dailyLimit - limitsData?.dailyUsed;
  const monthlyRemaining = limitsData?.monthlyLimit - limitsData?.monthlyUsed;
  const dailyPercentage = (limitsData?.dailyUsed / limitsData?.dailyLimit) * 100;
  const monthlyPercentage = (limitsData?.monthlyUsed / limitsData?.monthlyLimit) * 100;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Transfer Limits & Charges</h3>
      <div className="space-y-6">
        {/* Daily Limits */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Daily Limit</span>
            <span className="text-sm text-muted-foreground">
              ₹{limitsData?.dailyUsed?.toLocaleString('en-IN')} / ₹{limitsData?.dailyLimit?.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                dailyPercentage > 80 ? 'bg-error' : dailyPercentage > 60 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${Math.min(dailyPercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Remaining: ₹{dailyRemaining?.toLocaleString('en-IN')}
          </p>
        </div>

        {/* Monthly Limits */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Monthly Limit</span>
            <span className="text-sm text-muted-foreground">
              ₹{limitsData?.monthlyUsed?.toLocaleString('en-IN')} / ₹{limitsData?.monthlyLimit?.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                monthlyPercentage > 80 ? 'bg-error' : monthlyPercentage > 60 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${Math.min(monthlyPercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Remaining: ₹{monthlyRemaining?.toLocaleString('en-IN')}
          </p>
        </div>

        {/* Transfer Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg">
              <Icon name="CreditCard" size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Per Transaction</p>
              <p className="text-xs text-muted-foreground">₹{limitsData?.transactionLimit?.toLocaleString('en-IN')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-lg">
              <Icon name="Clock" size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Processing Time</p>
              <p className="text-xs text-muted-foreground">{limitsData?.processingTime}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-50 rounded-lg">
              <Icon name="Receipt" size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Transfer Charges</p>
              <p className="text-xs text-muted-foreground">{limitsData?.charges}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-50 rounded-lg">
              <Icon name="Shield" size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Security</p>
              <p className="text-xs text-muted-foreground">OTP + Password</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-600 mb-1">Important Notes</p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>• Limits reset daily at 12:00 AM IST</li>
                <li>• RTGS available 7:00 AM to 6:00 PM on working days</li>
                <li>• UPI and IMPS available 24x7</li>
                <li>• Higher limits available for premium accounts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferLimits;