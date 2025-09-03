import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingBills = ({ bills, onSetReminder, onPayNow }) => {
  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateStatus = (dueDate) => {
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return { text: 'Overdue', color: 'text-error bg-error/10' };
    if (days === 0) return { text: 'Due Today', color: 'text-warning bg-warning/10' };
    if (days <= 3) return { text: `${days} days left`, color: 'text-warning bg-warning/10' };
    return { text: `${days} days left`, color: 'text-muted-foreground bg-muted' };
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Upcoming Bills</h3>
            <p className="text-sm text-muted-foreground mt-1">Bills due in the next 30 days</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            Add Bill
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {bills?.map((bill) => {
          const dueDateStatus = getDueDateStatus(bill?.dueDate);
          
          return (
            <div key={bill?.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                    <img
                      src={bill?.providerLogo}
                      alt={bill?.providerName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground truncate">{bill?.providerName}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${dueDateStatus?.color}`}>
                        {dueDateStatus?.text}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{bill?.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>Due: {bill?.dueDate}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span className="font-data">{bill?.customerNumber}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right ml-4 flex-shrink-0">
                  <div className="text-lg font-semibold text-foreground mb-2">₹{bill?.amount}</div>
                  <div className="flex flex-col space-y-1">
                    <Button
                      variant="default"
                      size="xs"
                      onClick={() => onPayNow(bill)}
                      iconName="CreditCard"
                      iconPosition="left"
                      className="text-xs"
                    >
                      Pay Now
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onSetReminder(bill)}
                      iconName="Bell"
                      iconPosition="left"
                      className="text-xs"
                    >
                      Remind Me
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {bills?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Upcoming Bills</h3>
          <p className="text-muted-foreground">Add your regular bills to track due dates and never miss a payment.</p>
          <Button
            variant="outline"
            className="mt-4"
            iconName="Plus"
            iconPosition="left"
          >
            Add Your First Bill
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingBills;