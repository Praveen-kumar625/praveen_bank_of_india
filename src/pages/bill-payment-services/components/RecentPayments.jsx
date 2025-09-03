import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentPayments = ({ payments, onViewAll, onRepeatPayment }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Recent Payments</h3>
            <p className="text-sm text-muted-foreground mt-1">Your latest bill payments and recharges</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewAll}
            iconName="ExternalLink"
            iconPosition="right"
          >
            View All
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {payments?.map((payment) => (
          <div key={payment?.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                  <img
                    src={payment?.providerLogo}
                    alt={payment?.providerName}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground truncate">{payment?.providerName}</h4>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment?.status)}`}>
                      <Icon name={getStatusIcon(payment?.status)} size={12} />
                      <span className="capitalize">{payment?.status}</span>
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{payment?.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{payment?.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Hash" size={12} />
                      <span className="font-data">{payment?.transactionId}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right ml-4 flex-shrink-0">
                <div className="text-lg font-semibold text-foreground mb-1">₹{payment?.amount}</div>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onRepeatPayment(payment)}
                  iconName="Repeat"
                  iconPosition="left"
                  className="text-xs"
                >
                  Repeat
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {payments?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Receipt" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Recent Payments</h3>
          <p className="text-muted-foreground">Your recent bill payments and recharges will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default RecentPayments;