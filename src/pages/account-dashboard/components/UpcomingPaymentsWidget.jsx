import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingPaymentsWidget = () => {
  const upcomingPayments = [
    {
      id: 1,
      title: 'Electricity Bill',
      provider: 'MSEB Maharashtra',
      amount: 2850,
      dueDate: '2025-09-08',
      status: 'due',
      category: 'utility',
      icon: 'Zap'
    },
    {
      id: 2,
      title: 'Home Loan EMI',
      provider: 'Praveen Bank of India',
      amount: 45000,
      dueDate: '2025-09-10',
      status: 'upcoming',
      category: 'loan',
      icon: 'Home'
    },
    {
      id: 3,
      title: 'Mobile Postpaid',
      provider: 'Airtel',
      amount: 599,
      dueDate: '2025-09-12',
      status: 'upcoming',
      category: 'telecom',
      icon: 'Smartphone'
    },
    {
      id: 4,
      title: 'Credit Card Bill',
      provider: 'HDFC Bank',
      amount: 12450,
      dueDate: '2025-09-15',
      status: 'upcoming',
      category: 'credit',
      icon: 'CreditCard'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days`;
    
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'due':
        return 'text-error';
      case 'upcoming':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'due':
        return 'bg-error/10';
      case 'upcoming':
        return 'bg-warning/10';
      default:
        return 'bg-muted';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'utility':
        return 'text-primary bg-primary/10';
      case 'loan':
        return 'text-accent bg-accent/10';
      case 'telecom':
        return 'text-success bg-success/10';
      case 'credit':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const totalAmount = upcomingPayments?.reduce((sum, payment) => sum + payment?.amount, 0);

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Upcoming Payments</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Total: {formatCurrency(totalAmount)}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            iconSize={14}
          >
            View Calendar
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {upcomingPayments?.map((payment) => (
            <div
              key={payment?.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${getCategoryColor(payment?.category)}`}>
                  <Icon name={payment?.icon} size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{payment?.title}</h3>
                  <p className="text-sm text-muted-foreground">{payment?.provider}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {formatCurrency(payment?.amount)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBg(payment?.status)} ${getStatusColor(payment?.status)}`}>
                      {formatDate(payment?.dueDate)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ArrowRight"
                  iconSize={14}
                  className="text-muted-foreground hover:text-foreground"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={16} color="var(--color-primary)" />
              <span className="text-sm text-foreground">Set up auto-pay to never miss a payment</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              iconSize={14}
              className="text-muted-foreground hover:text-foreground"
            >
              Manage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPaymentsWidget;