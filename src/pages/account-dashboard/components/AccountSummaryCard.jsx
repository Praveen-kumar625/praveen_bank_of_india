import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountSummaryCard = ({ account, onRefresh, onViewDetails }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const getAccountTypeIcon = (type) => {
    switch (type) {
      case 'savings':
        return 'Wallet';
      case 'current':
        return 'Building2';
      case 'loan':
        return 'CreditCard';
      case 'fd':
        return 'TrendingUp';
      default:
        return 'Wallet';
    }
  };

  const getAccountTypeColor = (type) => {
    switch (type) {
      case 'savings':
        return 'text-success';
      case 'current':
        return 'text-primary';
      case 'loan':
        return 'text-warning';
      case 'fd':
        return 'text-accent';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-muted ${getAccountTypeColor(account?.type)}`}>
            <Icon name={getAccountTypeIcon(account?.type)} size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{account?.name}</h3>
            <p className="text-sm text-muted-foreground font-data">{account?.number}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRefresh(account?.id)}
          iconName="RefreshCw"
          iconSize={16}
          className="text-muted-foreground hover:text-foreground"
        />
      </div>
      <div className="mb-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-foreground">
            {formatCurrency(account?.balance)}
          </span>
          {account?.type === 'loan' && (
            <span className="text-sm text-muted-foreground">Outstanding</span>
          )}
        </div>
        {account?.availableBalance && (
          <p className="text-sm text-muted-foreground mt-1">
            Available: {formatCurrency(account?.availableBalance)}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <span>Last updated: {account?.lastUpdated}</span>
        {account?.status && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            account?.status === 'active' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
          }`}>
            {account?.status}
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(account)}
          iconName="Eye"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          View Details
        </Button>
        {account?.type !== 'loan' && (
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowUpRight"
            iconSize={14}
          >
            Transfer
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountSummaryCard;